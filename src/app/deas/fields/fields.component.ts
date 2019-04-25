import { Component, OnInit } from '@angular/core';
import { FieldModel } from "../../common/models";
import { Store } from "@ngrx/store";
import * as RootStoreState from "../../root-store/state";
import { MatDialog } from "@angular/material";
import { Subscription } from "rxjs";
import * as FieldStoreSelectors from "../../root-store/field-store/selectors";
import { ObjectDialogComponent } from "../../common/components/objects/object-dialog/object-dialog.component";
import * as FieldStoreActions from "../../root-store/field-store/actions";

@Component({
	selector: 'gci-fields',
	templateUrl: './fields.component.html',
	styleUrls: [ './fields.component.scss' ]
})
export class FieldsComponent implements OnInit {
	
	public fields: FieldModel[] = [];
	
	public tableColumns = [ 'Summary', 'Detail', 'CreatedAt' ];
	
	dialogIsOpen = false;
	
	isLoading = true;
	
	public subscription: Subscription;
	
	constructor(private store: Store<RootStoreState.State>,
				public dialog: MatDialog) { }
	
	ngOnInit() {
		
		this.subscription = this.store.select(FieldStoreSelectors.selectAllFields)
			.subscribe((fields: FieldModel[]) => {
				this.fields = fields;
				this.isLoading = false;
			})
		
	}
	
	public onCreateNew() {
		let obj = new FieldModel();
		this.onOpenDialog(obj, false);
	}
	
	public onUpdate(obj: any) {
		this.onOpenDialog(obj, true);
	}
	
	private onOpenDialog(obj: any, isEdit: boolean) {
		
		const data = {
			isEdit: isEdit,
			obj: obj
		};
		
		let dialogRef = this.dialog.open(ObjectDialogComponent, {
			// height: '90vh',
			// maxWidth: '90vw',
			data: data
		});
		
		dialogRef.afterClosed().subscribe(result => {
			if (result && result != 'delete' && result !== false) { this.save(result, data.isEdit); }
			else if (result == 'delete') { this.delete(data.obj.UID); }
			this.dialogIsOpen = false;
		});
	}
	
	private save(dialogObj: any, isEdit: boolean) {
		
		let obj = new FieldModel(dialogObj);
		
		if (isEdit) {
			this.store.dispatch(new FieldStoreActions.UpdateRequest({obj: obj}));
		} else {
			this.store.dispatch(new FieldStoreActions.AddRequest({obj: obj}));
		}
	}
	
	private delete(uid: string) {
		this.store.dispatch(new FieldStoreActions.DeleteRequest({UID: uid}));
	}
	
}
