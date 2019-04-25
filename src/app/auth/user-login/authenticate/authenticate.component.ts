import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { AuthStoreSelectors, RootStoreState } from '../../../root-store';
import { Login } from "../../../root-store/auth-store/actions";

@Component({
	selector: 'gci-authenticate',
	templateUrl: './authenticate.component.html',
	styleUrls: [ './authenticate.component.scss' ]
})
export class AuthenticateComponent implements OnInit {
	
	public userForm: FormGroup;
	
	@Input() public username: string; // this could be used to 'pre-populate' the username
	
	@Output() public isAuth = new EventEmitter<boolean>();
	
	public hidePassword = true;
	
	public isLoading: boolean;
	
	constructor(private formBuilder: FormBuilder,
				private store: Store<RootStoreState.State>) {
	}
	
	ngOnInit() {
		this.initForm();
		
		this.store.select(AuthStoreSelectors.selectAuthIsLoading)
			.subscribe(result => {
				this.isLoading = result;
			});
	}
	
	initForm() {
		this.userForm = this.formBuilder.group({
			username: [ '', Validators.required ],
			password: [ '', Validators.required ],
		});
	}
	
	canSubmit() {
		return this.userForm.valid && this.userForm.get('username').dirty && this.userForm.get('password').dirty;
	}
	
	public onSubmit() {
		this.store.dispatch(new Login({
			username: this.userForm.get('username').value,
			password: this.userForm.get('password').value
		}));
	}
	
}
