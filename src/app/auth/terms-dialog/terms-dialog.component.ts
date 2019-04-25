import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
	selector: 'gci-terms-dialog',
	templateUrl: './terms-dialog.component.html',
	styleUrls: [ './terms-dialog.component.scss' ]
})
export class TermsDialogComponent implements OnInit {
	
	public isAccepted: boolean;
	
	constructor(public dialogRef: MatDialogRef<TermsDialogComponent>,
				@Inject(MAT_DIALOG_DATA) public data: any) {
	}
	
	ngOnInit() {
		this.isAccepted = this.data;
		
		this.dialogRef.backdropClick().subscribe(() => {
			this.closeDialog();
		})
	}
	
	public onAgreeClick(): void {
		this.dialogRef.close(true);
	}
	
	public onCancelClick(): void {
		this.closeDialog();
	}
	
	closeDialog() {
		this.dialogRef.close(this.isAccepted);
	}
}

