import { Component, OnDestroy, OnInit } from '@angular/core';
import { IdeaModel } from '../../common/models';
import { MatDialog } from '@angular/material';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as RootStoreState from '../../root-store/state';
import * as IdeaStoreSelectors from '../../root-store/idea-store/selectors';
import { ObjectDialogComponent } from '../../common/components/objects/object-dialog/object-dialog.component';
import * as IdeaStoreActions from '../../root-store/idea-store/actions';

@Component({
    selector: 'gci-ideas',
    templateUrl: './ideas.component.html',
    styleUrls: [ './ideas.component.scss' ]
})
export class IdeasComponent implements OnInit, OnDestroy {
    
    // public ideas$: Observable<IdeaModel[]>;
    public ideas: IdeaModel[] = [];
    
    public tableColumns = [ 'Summary', 'Detail' ];
    
    public dialogIsOpen = false;
    
    public isLoading = true;
    
    public subscription: Subscription;
    
    constructor(private store: Store<RootStoreState.State>,
                public dialog: MatDialog) {
        
    }
    
    ngOnInit() {
        this.store.dispatch(new IdeaStoreActions.LoadRequest);
    
        // this.ideas$ = this.store.select(IdeaStoreSelectors.selectAllIdeas);
        
        this.subscription = this.store.select(IdeaStoreSelectors.selectAllIdeas)
            .subscribe((ideas: IdeaModel[]) => {
                this.ideas = ideas;
                console.log('allIdeas subscription');
                this.isLoading = false;
            });
    }
    
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    
    onAddObject() {
        
        let obj = new IdeaModel();
        
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
        
        let idea = new IdeaModel(obj);
        
        if (isEdit) {
            this.store.dispatch(new IdeaStoreActions.UpdateRequest({idea: idea}));
        } else {
            this.store.dispatch(new IdeaStoreActions.AddRequest({idea: idea}));
        }
        
    }
    
    private delete(uid: string) {
        
        this.store.dispatch(new IdeaStoreActions.DeleteRequest({UID: uid}));
        
    }
    
}
