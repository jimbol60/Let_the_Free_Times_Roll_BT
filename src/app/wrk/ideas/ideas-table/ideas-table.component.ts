import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { IdeaModel } from "../../../common/models/index";
import { IdeaDialogComponent } from "../idea-dialog/idea-dialog.component";
import { Store } from "@ngrx/store";
import * as RootStoreState from '../../../root-store/state'
import { IdeaStoreSelectors } from '../../../root-store/idea-store/index'
import { animate, state, style, transition, trigger } from "@angular/animations";
import { Subscription } from "rxjs";

@Component({
	selector: 'gci-inv-ideas-table',
	templateUrl: './ideas-table.component.html',
	styleUrls: [ './ideas-table.component.scss' ],
	animations: [
		trigger('detailExpand', [
			state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
			state('expanded', style({height: '*'})),
			transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
		]),
	],
})
export class IdeasTableComponent implements OnInit, OnDestroy {
	
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	
	ideas: IdeaModel[] = [];
	
	displayedColumns = [ 'select', 'Summary' ];
	
	dataSource: MatTableDataSource<IdeaModel>;
	
	selection = new SelectionModel<IdeaModel>(true, []);
	
	expandedModel: IdeaModel | null;
	
	dialogIsOpen = false;
	
	isLoading = false;
	
	msgList: string;
	
	objCount: number = 0;
	
	objSelectedCount: number = 0;
	
	objectsSelectedMsg: string = "No objects.";
	
	public subscription: Subscription;
	
	constructor(private store: Store<RootStoreState.State>,
				public dialog: MatDialog) {
	
	}
	
	ngOnInit() {
		this.subscription = this.store.select(IdeaStoreSelectors.selectAllIdeas)
			.subscribe( (ideas: IdeaModel[]) => {
				
				this.ideas = ideas;
				
				// Assign the data to the data source for the table-example to render
				this.dataSource = new MatTableDataSource(this.ideas);
				
				this.objCount = this.ideas.length;
				this.updateObjSelectedMsg();
				
				// make it so that it sorts lower case along with upper case.
				this.dataSource.sortingDataAccessor = (data, sortHeaderId) => data[sortHeaderId].toLocaleLowerCase();
				
				this.dataSource.paginator = this.paginator;
				this.dataSource.sort = this.sort;
				
				if (this.ideas.length < 1) {
					this.msgList = "No examples to display"
				} else {
				
				}
				this.isLoading = false;
			})
	}
	
	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
	
	applyFilter(filterValue: string) {
		filterValue = filterValue.trim(); // Remove whitespace
		filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
		this.dataSource.filter = filterValue;
	}
	
	updateObjSelectedMsg() {
		this.updateCountSelected();
		
		if (this.isAllSelected()) {
			this.objectsSelectedMsg = "(all " + this.objCount + " objects are selected)"
		} else if (this.objSelectedCount > 0) {
			this.objectsSelectedMsg = "(" + this.objSelectedCount + " of " + this.objCount + " objects are selected)"
		} else {
			this.objectsSelectedMsg = "(" + this.objCount + " objects, none selected)"
		}
		
	}
	
	updateCountSelected() {
		this.objSelectedCount = this.selection.selected.length;
	}
	
	/** Whether the number of selected elements matches the total number of rows. */
	isAllSelected() {
		const numSelected = this.selection.selected.length;
		const numRows = this.dataSource.data.length;
		return numSelected === numRows;
	}
	
	/** Selects all rows if they are not all selected; otherwise clear selection. */
	masterToggle() {
		this.isAllSelected() ?
			this.selection.clear() :
			this.dataSource.data.forEach(row => this.selection.select(row));
		
	}
	
	onAddObject() {
		
		let idea = new IdeaModel();
		
		let dialogRef = this.dialog.open(IdeaDialogComponent, {
			// height: '90vh',
			// maxWidth: '90vw',
			data: idea
		});
		
		dialogRef.afterClosed().subscribe(result => {
			this.dialogIsOpen = false;
		});
	}
	
	onObjBulkChange() {
		
		if (this.selection.selected.length > 0) {
			this.dataSource.data.forEach(row => this.changeDescr(row));
		} else {
			console.log("Nothing is selected.")
		}
		
		
	}
	
	changeDescr(idea: IdeaModel) {
		if (this.selection.isSelected(idea)) {
			idea.Detail = "BULK CHANGED";
		}
		
		
	}
}
