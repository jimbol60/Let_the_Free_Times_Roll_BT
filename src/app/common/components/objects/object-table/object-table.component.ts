import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { SelectionModel } from "@angular/cdk/collections";
import { ObjectInterface } from '../object.interface';
import { DEFAULT_DATE_FORMAT } from "../../../../app.config";

@Component({
	selector: 'gci-object-table',
	templateUrl: './object-table.component.html',
	styleUrls: [ './object-table.component.scss' ]
})
export class ObjectTableComponent implements OnInit, OnChanges {
	
	@Input() objects: ObjectInterface[] = [];
	@Input() columnsToDisplay: string[] = [];
	
	@Output() createNew = new EventEmitter();
	@Output() updateOne = new EventEmitter<any>();
	
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	@ViewChild('tableFilter') tableFilter: ElementRef;
	
	dataSource: MatTableDataSource<ObjectInterface>;
	
	selection = new SelectionModel<ObjectInterface>(true, []);
	
	displayedColumns: string[] = [ 'select' ];
	// preconfigCols: string[] = [ 'select', 'UID', 'Summary', 'Detail', 'CreatedAt' ]; // [ ] TODO GB20190226215942: https://github.com/angular/angular/issues/27267
	
	public dateFormat = DEFAULT_DATE_FORMAT;  // [ ] TODO GB20190226210444: The date format really needs to come from user preferences...
	
	msgList = '';
	
	objCount: number = 0;
	
	objSelectedCount: number = 0;
	
	objectsSelectedMsg: string = "Nothing selected";
	
	// control click events a little better
	doubleClickTime: number = 0;
	clickTime: number = 0;
	clickWaitTime: number = 2000;
	
	constructor() {}
	
	ngOnInit() {
		
		// Add select column to the displayed columns
		if (this.columnsToDisplay.length > 0) {
			this.displayedColumns = this.displayedColumns.concat(this.columnsToDisplay);
		}
		
		this.setDataSource();
		
		// selection changed
		this.selection.onChange.subscribe((a) => {
			// if (a.added[ 0 ]) { 	// will be undefined if no selection
			// 	alert('You selected ' + a.added[ 0 ].Summary);
			// }
			this.updateObjSelectedMsg()
		});
		
	}
	
	setDataSource() {
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(this.objects);
        
        // For selecting objects, initialize the counting of selected and the message showing selection stats
        this.objCount = this.objects.length;
        this.updateObjSelectedMsg();
        
        // make it so that it sorts lower case along with upper case, and removes html tags for sorting purposes.
        this.dataSource.sortingDataAccessor = (data, sortHeaderId) => data[ sortHeaderId ].toLocaleLowerCase().replace(/(<([^>]+)>)/ig, "");
        
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        
        if (this.objects.length < 1) {
            this.msgList = "No rows to display"
        }
	}
    
    ngOnChanges(changes) {
        if (changes.objects) {
            this.setDataSource();
        }
    }
	
	public applyFilter(filterValue: string) {
		filterValue = filterValue.trim(); // Remove whitespace
		filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
		this.dataSource.filter = filterValue;
	}
	
	public onClearFilter() {
		this.tableFilter.nativeElement.value = '';
		this.applyFilter('');
	}
	
	public updateObjSelectedMsg() {
		this.updateCountSelected();
		
		if (this.isAllSelected()) {
			this.objectsSelectedMsg = "(all " + this.objCount + " objects are selected)"
		} else if (this.objSelectedCount > 0) {
			this.objectsSelectedMsg = "(" + this.objSelectedCount + " of " + this.objCount + " objects are selected)"
		} else {
			this.objectsSelectedMsg = "(" + this.objCount + " objects, none selected)"
		}
		
	}
	
	/**
	 *
	 */
	public updateCountSelected() {
		this.objSelectedCount = this.selection.selected.length;
	}
	
	/**
	 * Whether the number of selected elements matches the total number of rows.
	 */
	public isAllSelected() {
		const numSelected = this.selection.selected.length;
		const numRows = this.dataSource.data.length;
		return numSelected === numRows;
	}
	
	/**
	 * Selects all rows if they are not all selected; otherwise clear selection.
	 */
	public masterToggle() {
		this.isAllSelected() ?
			this.selection.clear() :
			this.dataSource.data.forEach(row => this.selection.select(row));
		
	}
	
	public onCreateNew() {
		this.createNew.emit();
	}
	
	public onUpdate(obj: any) {
		this.updateOne.emit(obj);
	}
	
	public onRightClick(event: any) {
		return false;
	}
	
	public onClick(row) {
		// this.doOnClick(row);
	}
	
	public doOnClick(row) {
		this.selection.toggle(row);
	}
	
	public onDoubleClick(row) {
		this.doubleClickTime = new Date().getTime();
		this.onUpdate(row);
	}
}
