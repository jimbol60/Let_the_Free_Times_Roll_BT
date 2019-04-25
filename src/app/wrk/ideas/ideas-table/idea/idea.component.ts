import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material";
import { IdeaDialogComponent } from "../../idea-dialog/idea-dialog.component";
import { IdeaModel } from "../../../../common/models/index";

@Component({
	selector: 'gci-inv-idea',
	templateUrl: './idea.component.html',
	styleUrls: [ './idea.component.scss' ]
})
export class IdeaComponent implements OnInit {
	
	@Input() idea: IdeaModel;
	
	dialogIsOpen = false;
	
	constructor(public dialog: MatDialog,) {
	}
	
	ngOnInit() {
	}
	
	onEdit() {
		
		this.dialogIsOpen = true;
		
		const copy = JSON.parse(JSON.stringify(this.idea));
		
		let dialogRef = this.dialog.open(IdeaDialogComponent, {
			// height: '90vh',
			// maxWidth: '90vw',
			data: copy
		});
		
		dialogRef.afterClosed().subscribe(result => {
			this.dialogIsOpen = false;
		});
		
	}
	
}
