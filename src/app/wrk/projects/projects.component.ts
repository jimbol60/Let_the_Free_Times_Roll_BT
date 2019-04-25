import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { RootStoreState, ProjStoreActions, ProjStoreSelectors } from '../../root-store/index'
import { ProjectModel } from '../../common/models';
import { ObjectDialogComponent } from '../../common/components/objects/object-dialog/object-dialog.component';

@Component({
    selector: 'gci-projects',
    templateUrl: './projects.component.html',
    styleUrls: [ './projects.component.scss' ]
})
export class ProjectsComponent implements OnInit, OnDestroy {
    
    public objs: ProjectModel[] = [];
    
    public tableColumns = [ 'Summary', 'Detail' ];
    
    public dialogIsOpen = false;
    
    public isLoading = true;
    
    public selectAllSub: Subscription;
    
    constructor(private store: Store<RootStoreState.State>,
                public dialog: MatDialog) {
        
    }
    
    ngOnInit() {
        
        this.store.dispatch(new ProjStoreActions.LoadRequest);
        
        this.selectAllSub = this.store.select(ProjStoreSelectors.selectAll)
            .subscribe((objs: ProjectModel[]) => {
                this.objs = objs;
                this.isLoading = false;
            });
    }
    
    ngOnDestroy() {
        this.selectAllSub.unsubscribe();
    }
    
    onAddObject() {
        
        let obj = new ProjectModel();
        
        const data = {
            isEdit: false,
            obj: obj
        };
        
        let dialogRef = this.dialog.open(ObjectDialogComponent, {
            // height: '90vh',
            // maxWidth: '90vw',
            data: data
        });
        
        dialogRef.afterClosed().subscribe(result => {
            
            if (result && result != 'delete' && result !== false) {
                this.save(result, data.isEdit);
            }
            else if (result == 'delete') {
                this.delete(data.obj.UID);
            }
            
            this.dialogIsOpen = false;
        });
    }
    
    private save(obj: any, isEdit: boolean) {
        
        let newObj = new ProjectModel(obj);
        
        if (isEdit) {
            this.store.dispatch(new ProjStoreActions.UpdateRequest({obj: newObj}));
        } else {
            this.store.dispatch(new ProjStoreActions.AddRequest({obj: newObj}));
        }
        
    }
    
    public onUpdateOne(obj: ProjectModel) {
        
        const data = {
            isEdit: true,
            obj: obj
        };
        
        let dialogRef = this.dialog.open(ObjectDialogComponent, {
            // height: '90vh',
            // maxWidth: '90vw',
            data: data
        });
        
        dialogRef.afterClosed().subscribe(result => {
            
            if (result && result !== 'delete' && result !== false) {
                this.save(result, data.isEdit);
            }
            else if (result == 'delete') {
                this.delete(data.obj.UID);
            }
            
            this.dialogIsOpen = false;
        });
    }
    
    private delete(uid: string) {
        
        this.store.dispatch(new ProjStoreActions.DeleteRequest({UID: uid}));
        
    }
    
}
