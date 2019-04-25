import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

import { ObjectInterface } from "../object.interface";
import { environment } from "../../../../../environments/environment";

export interface DialogData {
	isEdit: boolean;
	obj: ObjectInterface;
}

@Component({
	selector: 'gci-object-dialog',
	templateUrl: './object-dialog.component.html',
	styleUrls: [ './object-dialog.component.scss' ]
})
export class ObjectDialogComponent implements OnInit {
	
	originalObj: ObjectInterface;
	formGroup: FormGroup;
	
	isSaving: boolean = false;
	
	public richTextHTML = "";
	public showEditorHTML = false;
	
	constructor(private formBuilder: FormBuilder,
				public dialogRef: MatDialogRef<ObjectDialogComponent>,
				@Inject(MAT_DIALOG_DATA) public data: DialogData) {
	}
	
	ngOnInit() {
		
		if (!environment.production) {
			this.showEditorHTML = true;
		}
		
		this.initForm();
	}
	
	public editorChange(event) {
		this.richTextHTML = event.html;
	}
	
	private sanitizeHTML(html: string) {
		
		// [ ] TODO GB20190218194953: Need to build out custom html sanitizer or find other solution
		
		return html;
	}
	
	initForm() {
		if (this.data.isEdit) {
			this.originalObj = this.data.obj;
		}
		
		this.formGroup = this.formBuilder.group({
			summary: [ this.data.obj.Summary, Validators.required ],
			detail: [ this.data.obj.Detail ],
		});
		this.richTextHTML = this.data.obj.Detail;
	}
	
	canSave() {
		if (!this.isSaving) {
			if (this.data.isEdit && this.hasChanged()) {
				return true;
			} else if (!this.data.isEdit && !this.isSaving) {
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
			this.formGroup.get('summary').value !== this.originalObj.Summary ||
			this.formGroup.get('detail').value !== this.originalObj.Detail
		);
	}
	
	private prepareSubmit() {
		
		let obj = JSON.parse(JSON.stringify(this.data.obj));
		
		obj['Summary'] = this.formGroup.get('summary').value;
		obj['Detail'] = this.sanitizeHTML(this.formGroup.get('detail').value);
		
		return obj;
	}
	
	public onSubmit(): void {
		
		this.isSaving = true;
		
		if (this.data.obj) {
			
			let obj = this.prepareSubmit();
			
			this.dialogRef.close(obj);
		}
	}
	
	onCancel() {
		this.dialogRef.close();
	}
	
	onDelete() {
		this.dialogRef.close('delete');
	}
	
}