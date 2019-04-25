import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

import { IdeaService } from "../idea.service";
import { GciUtilService } from "../../../common/util/gci-util.service";
import { IdeaModel } from "../../../common/models/index";
import { Store } from "@ngrx/store";
import { RootStoreState, IdeaStoreActions } from '../../../root-store/index'

@Component({
	selector: 'gci-idea-dialog',
	templateUrl: './idea-dialog.component.html',
	styleUrls: [ './idea-dialog.component.scss' ]
})
export class IdeaDialogComponent implements OnInit {
	
	originalIdea: IdeaModel;
	formGroup: FormGroup;
	isEditMode: boolean = false;
	
	isSaving: boolean = false;
	
	constructor(private formBuilder: FormBuilder,
				private gciUtilService: GciUtilService,
				private ideaService: IdeaService,
				public dialogRef: MatDialogRef<IdeaDialogComponent>,
				private store: Store<RootStoreState.State>,
				@Inject(MAT_DIALOG_DATA) public idea: IdeaModel) {
	}
	
	ngOnInit() {
		
		// If there is a UID, then it is an edit.  If no UID, then it is a new idea.
		this.idea.UID ? this.isEditMode = true : this.isEditMode = false;
		
		this.initForm();
	}
	
	initForm() {
		if (this.isEditMode) {
			this.originalIdea = this.idea;
		}
		
		this.formGroup = this.formBuilder.group({
			summary: [ this.idea.Summary, Validators.required ],
			detail: [ this.idea.Detail ],
		});
	}
	
	canSave() {
		if (!this.isSaving) {
			if (this.isEditMode && this.hasChanged()) {
				return true;
			} else if (!this.isEditMode && !this.isSaving) {
				return this.formGroup.valid;
			}
		} else {
			return false;
		}
	}
	
	hasChanged() {
		return this.formGroup.valid && (
			this.formGroup.get('summary').dirty ||
			this.formGroup.get('detail').dirty
		) && (
			this.formGroup.get('summary').value !== this.originalIdea.Summary ||
			this.formGroup.get('detail').value !== this.originalIdea.Detail
		);
	}
	
	onSubmit(): void {
		
		this.isSaving = true;
		
		if (this.idea) {
			
			this.idea.Summary = this.formGroup.get('summary').value;
			this.idea.Detail = this.formGroup.get('detail').value;
			
			if (this.isEditMode) {
				this.store.dispatch(new IdeaStoreActions.UpdateRequest({idea: this.idea}));
				this.dialogRef.close();
			} else {
				this.store.dispatch(new IdeaStoreActions.AddRequest({idea: this.idea}));
				this.dialogRef.close();
			}
		}
	}
	
	onCancel() {
		this.dialogRef.close();
	}
	
	onDelete() {
		if (this.idea) {
			this.ideaService.deleteIdea(this.idea.UID);
		}
		this.dialogRef.close();
	}
	
}