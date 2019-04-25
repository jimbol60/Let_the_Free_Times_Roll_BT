import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as RootStoreState from '../../root-store/state';
import * as AuthStoreSelectors from '../../root-store/auth-store/selectors';
import { MatChipInputEvent } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FieldModel } from '../../common/models';
import * as ContextStoreSelectors from '../../root-store/context-store/selectors';
import * as FieldStoreSelectors from '../../root-store/field-store/selectors';
import { ContextAddFieldUID, ContextRemoveFieldUID } from '../../root-store/context-store/actions';
import { selectAllFields } from '../../root-store/field-store/selectors';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

@Component({
    selector: 'gci-field-nav',
    templateUrl: './field-nav.component.html',
    styleUrls: [ './field-nav.component.scss' ]
})
export class FieldNavComponent implements OnInit {
    
    public isLoggedIn: boolean;
    public isLoggedIn$: Observable<boolean>;
    
    public showToolTipClass = true;
    
    public allFields: FieldModel[] = [];
    public availableFields: FieldModel[] = [];
    public filteredFields: Observable<FieldModel[]>;
    public fieldsControl = new FormControl();
    
    public contextFields: FieldModel[] = [];
    
    readonly separatorKeysCodes: number[] = [ENTER, COMMA];
    selectable = true;
    removable = true;
    addOnBlur = true;
    
    constructor(private router: Router,
                private store: Store<RootStoreState.State>) {
        console.log('# (field-nav) constructor');
        
    }
    
    ngOnInit() {
        
        this.isLoggedIn$ = this.store.select(AuthStoreSelectors.selectAuthIsLoggedIn);
    
        this.store.select(ContextStoreSelectors.selectContextFieldUIDs)
            .subscribe(result => {
                if(result) {
                    this.contextFields = [];
                    for(let uid of result) {
                        this.store.select(FieldStoreSelectors.selectFieldById(uid))
                            .subscribe( (field: FieldModel) => {
                                this.contextFields.push(field);
                            })
                    }
                    this.syncAvailFields();
                }
            });
    
        this.store.select(selectAllFields)
            .subscribe( result => {
                this.allFields = result;
            });
            
        this.filteredFields = this.fieldsControl.valueChanges
            .pipe(
                startWith<string | FieldModel>(''),
                map(value => typeof value === 'string' ? value : value.Summary),
                map(summary => summary.length >= 2 ? this.fieldFilter(summary) : [])
            );
    }
    
    private syncAvailFields() {
        this.availableFields = [];
        for(let field of this.allFields) {
            const index1 = this.contextFields.indexOf(field);
            const index2 = this.availableFields.indexOf(field);
            if(index1 < 0 && index2 < 0) {
                this.availableFields.push(field);
            }
        }
    }
    
    private fieldFilter(value: string): FieldModel[] {
        const filterValue = value.toLowerCase();
        return this.availableFields.filter(option => option.Summary.toLowerCase().includes(filterValue));
    }
    
    public addField(event: MatChipInputEvent): void {
    
        console.log('MatChipInputEvent', event);
        
        const input = event.input; // the html element
        const summary = event.value; // the summary which was entered
        
        let possibleMatches = 0;
        let matchingField: FieldModel;
    
        if ((summary || '').trim()) {
    
            // is this entry in the available fields
            for(let field of this.availableFields) {
                if(field.Summary.includes(summary)) {
                    possibleMatches++;
                    matchingField = field;
                }
            }
            
            if(possibleMatches === 1) {
                
                // Add our field
                const uid = matchingField.UID;
                this.store.dispatch(new ContextAddFieldUID({ fieldUID: uid }));
            } else {
                alert("Not a strict match... ")
            }
        }
        
        // Reset the input value
        if (input) {
            input.value = '';
        }
        
        this.syncAvailFields();
    }
    
    public removeField(field: FieldModel): void {
        this.store.dispatch(new ContextRemoveFieldUID({ fieldUID: field.UID }));
        this.syncAvailFields();
    }
    
}
