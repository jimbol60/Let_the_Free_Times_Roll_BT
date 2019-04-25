import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { APP_TITLE, APP_VERSION } from "../../app.config";
import { environment } from "../../../environments/environment";
import { Store } from "@ngrx/store";
import { Logout } from "../../root-store/auth-store/actions";
import { AuthStoreSelectors, ContextStoreSelectors, RootStoreState, AcctStoreSelectors, FieldStoreSelectors } from '../../root-store/index';
import { AcctModel, FieldModel } from "../../common/models";
import { flatMap, map, mergeMapTo, switchMap } from "rxjs/operators";
import { Router } from "@angular/router";

@Component({
	selector: 'gci-main-nav',
	templateUrl: './main-nav.component.html',
	styleUrls: [ './main-nav.component.scss' ]
})
export class MainNavComponent implements OnInit {
	
	@Output() toggleSidenavStart = new EventEmitter();
	@Output() toggleSidenavEnd = new EventEmitter();
	@Output() toggleQuickFields = new EventEmitter();
	
	version = APP_VERSION;
	title = APP_TITLE;
	
	isProd = true;
	
	public isLoggedIn: boolean;
	
	// public currentAcct: AcctModel;
	public currentFields: FieldModel[];
	public contextFieldCount: number = 0;
	
	constructor(private router: Router,
				private store: Store<RootStoreState.State>) {
		console.log('# main-nav.component: constructor');
		
		this.isProd = environment.production;
	}
	
	ngOnInit() {
		this.store.select(AuthStoreSelectors.selectAuthIsLoggedIn)
			.subscribe(result => {
				this.isLoggedIn = result
			});
        
        this.store.select(ContextStoreSelectors.selectContextFieldUIDs)
            .subscribe(result => {
            	if(result) {
                    this.contextFieldCount = result.length;
				}
            });
	}
	
	public goToDashboard() {
		this.router.navigate(['dashboard']);
	}
	
	onToggleSidenavStart() {
		this.toggleSidenavStart.emit();
	}
	
	onToggleSidenavEnd() {
		this.toggleSidenavEnd.emit();
	}
	
	onLogout() {
		this.store.dispatch(new Logout());
	}
	
	onProfile() {
	
	}
    
    public onToggleQuickFields() {
		this.toggleQuickFields.emit();
	}
	
}
