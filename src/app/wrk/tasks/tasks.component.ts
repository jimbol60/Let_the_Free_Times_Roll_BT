import { Component, OnDestroy, OnInit } from '@angular/core';
import { TaskModel } from '../../common/models';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as RootStoreState from '../../root-store/state';
import * as TaskStoreSelectors from '../../root-store/task-store/selectors';
import { DialogData, ObjectDialogComponent } from '../../common/components/objects/object-dialog/object-dialog.component';
import * as TaskStoreActions from '../../root-store/task-store/actions';

@Component({
    selector: 'gci-ideas',
    templateUrl: './tasks.component.html',
    styleUrls: [ './tasks.component.scss' ]
})
export class TasksComponent implements OnInit, OnDestroy {
    
    public objs: TaskModel[] = [];
    
    public tableColumns = [ 'Summary', 'Detail' ];
    
    public dialogIsOpen = false;
    
    public isLoading = true;
    
    public selectAllSub: Subscription;
    
    constructor(private store: Store<RootStoreState.State>,
                public dialog: MatDialog) {
        
    }
    
    ngOnInit() {
        this.store.dispatch(new TaskStoreActions.LoadRequest);
    
        // this.ideas$ = this.store.select(IdeaStoreSelectors.selectAllIdeas);
        
        this.selectAllSub = this.store.select(TaskStoreSelectors.selectAllTasks)
            .subscribe((objs: TaskModel[]) => {
                this.objs = objs;
                this.isLoading = false;
            });
    }
    
    ngOnDestroy() {
        this.selectAllSub.unsubscribe();
    }
    
    onAddObject() {
        
        let obj = new TaskModel();
        
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
        
        let newObj = new TaskModel(obj);
        
        if (isEdit) {
            this.store.dispatch(new TaskStoreActions.UpdateRequest({task: newObj}));
        } else {
            this.store.dispatch(new TaskStoreActions.AddRequest({task: newObj}));
        }
        
    }
    
    public onUpdateOne(obj: TaskModel) {
        
        const data: DialogData = {
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
        
        this.store.dispatch(new TaskStoreActions.DeleteRequest({UID: uid}));
        
    }
    
}
