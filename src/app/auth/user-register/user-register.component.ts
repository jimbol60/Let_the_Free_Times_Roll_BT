import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { ConfirmPasswordValidator } from "../confirm-password.validator";
import { ValidateNotOnlyWhitespace } from "../../common/validators/not-only-whitespace.validator";
import { AuthService } from "../auth.service";
import { MatDialog } from "@angular/material";
import { TermsDialogComponent } from "../terms-dialog/terms-dialog.component";
import { Store } from "@ngrx/store";
import * as RootStoreState from "../../root-store/state";
import * as AuthStoreSelectors from "../../root-store/auth-store/selectors";
import { Register } from "../../root-store/auth-store/actions";

@Component({
	selector: 'gci-user-register',
	templateUrl: './user-register.component.html',
	styleUrls: [ './user-register.component.scss' ]
})
export class UserRegisterComponent implements OnInit {
	
	public userForm: FormGroup;
	
	public hidePassword = true;
	
	public emailIsChecked = false;
	public usernameIsChecked = false;
	
	public isLoading = true;
	public isSaving = false;
	public isReadyToSave = false;
	public isLoggedIn: boolean;
	
	constructor(private router: Router,
				private formBuilder: FormBuilder,
				private authService: AuthService,
				private store: Store<RootStoreState.State>,
				private dialog: MatDialog) {
		
		this.openTermsDialog();
	}
	
	ngOnInit() {
		
		this.store.select(AuthStoreSelectors.selectAuthIsLoggedIn)
			.subscribe(result => {
				this.isLoggedIn = result;
			});
		
		this.store.select(AuthStoreSelectors.selectAuthError)
			.subscribe( result => {
				if(result) {
					this.isSaving = false;
					this.userForm.enable();
				}
			});
		
		this.buildForm();
		this.isLoading = false;
	}
	
	public buildForm() {
		this.userForm = this.formBuilder.group({
			terms: [ false, [
				Validators.required
			] ],
			firstName: [ '', [
				Validators.required,
				Validators.minLength(1),
				ValidateNotOnlyWhitespace
			] ],
			lastName: [ '', [
				Validators.required,
				Validators.minLength(1),
				ValidateNotOnlyWhitespace
			] ],
			email: [ '', [
				Validators.required,
				Validators.email
			] ],
			username: [ '', [
				Validators.required,
				Validators.minLength(1),
				ValidateNotOnlyWhitespace
			] ],
			setPassword: this.formBuilder.group({
				newPassword: [ {value: '', disabled: false}, [
					Validators.required,
					Validators.minLength(1),
					ValidateNotOnlyWhitespace
				] ],
				confirmPassword: [ {value: '', disabled: true}, [
					Validators.required,
					Validators.minLength(1)
				] ],
			}, {validator: ConfirmPasswordValidator})
		})
	}
	
	public openTermsDialog(): void {
		
		let data = false;
		if(this.userForm) {
			data = this.userForm.get('terms').value;
		}
		
		const dialogRef = this.dialog.open(TermsDialogComponent, {
			height: '90vh',
			width: '50vw',
			minWidth: '400px',
			// panelClass: 'no-padding-dialog',
			data: data
		});
		
		dialogRef.afterClosed().subscribe(result => {
			this.userForm.get('terms').setValue(result);
		});
	}
	
	/**
	 * Verify that the email is unique and notify the user as soon as possible if it is not.
	 */
	public onEmailBlur() {
		
		if (this.userForm.get('email').valid) {
			const email = this.userForm.get('email').value;
			this.authService.checkEmail(email).subscribe(
				() => {
					this.emailIsChecked = true;
				},
				(() => {
					this.userForm.get('email').setErrors({'checkEmail': true});
					this.emailIsChecked = false;
				}));
		}
	}
	
	/**
	 * Verify that the username is unique and notify the user as soon as possible if it is not.
	 */
	public onUsernameBlur() {
		
		if (this.userForm.get('username').valid) {
			const username = this.userForm.get('username').value;
			this.authService.checkUsername(username).subscribe(
				() => {
					this.usernameIsChecked = true;
				},
				(() => {
					this.userForm.get('username').setErrors({'checkUsername': true});
					this.usernameIsChecked = false;
				}));
		}
	}
	
	public prepForSave(): any {
		
		let data = {};
		
		data[ 'Username' ] = this.userForm.get('username').value;
		data[ 'PasswordHash' ] = this.userForm.get('setPassword').get('confirmPassword').value;
		data[ 'FirstName' ] = this.userForm.get('firstName').value;
		data[ 'LastName' ] = this.userForm.get('lastName').value;
		data[ 'Email' ] = this.userForm.get('email').value;
		data[ 'AcceptTerms' ] = this.userForm.get('terms').value;
		
		return data;
	}
	
	public onSubmit() {
		
		this.isSaving = true;
		this.userForm.disable();
		
		let data = this.prepForSave();
		
		this.store.dispatch(new Register({data}));
	}
	
	public canSubmit() {
		this.isReadyToSave = this.userForm.valid && this.userForm.get('setPassword').valid;
		return this.isReadyToSave;
	}
	
	public onCancel() {
		this.router.navigate([ '' ]);
		this.isLoading = false;
	}
	
	public toggleConfirmPassword() {
		let setPass = this.userForm.get('setPassword');
		if (setPass.get('newPassword').dirty) {
			setPass.enable();
		} else {
			setPass.reset({
				confirmPassword: {value: '', disabled: true},
			})
		}
	}
	
	public onStrengthChanged(strength: number) {
	
	}
	
}