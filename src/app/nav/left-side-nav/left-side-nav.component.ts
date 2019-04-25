import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AcctModel } from "../../common/models";
import { Store } from "@ngrx/store";
import { AcctStoreSelectors, ContextStoreSelectors, RootStoreState } from '../../root-store/index';
import { Router } from '@angular/router';


@Component({
	selector: 'gci-left-side-nav',
	templateUrl: './left-side-nav.component.html',
	styleUrls: [ './left-side-nav.component.scss' ]
})
export class LeftSideNavComponent implements OnInit {
	
	@Output() closeSidenavStart = new EventEmitter();
	
	public currentAcctUID: string = '';
	
	public accts: AcctModel[];
	
	constructor(private store: Store<RootStoreState.State>,
                private router: Router,) {
		console.log('# left-side-nav.component: constructor');
	}
	
	ngOnInit() {
		console.log('## left-side-nav.component: ngOnInit');
		
		this.store.select(AcctStoreSelectors.selectAllAccts)
			.subscribe(accounts => {
				this.accts = accounts;
			});
		
		this.store.select(ContextStoreSelectors.selectContextAcctUID)
			.subscribe(acctUID => {
				if (acctUID) { this.currentAcctUID = acctUID; }
			});
		
		// [ ] TODO GB20190108223927: Testing use of init$ in auth store effects. If works, won't need this.
		// this.store.dispatch(new AuthStoreActions.LoginFromToken());
	}
	
	public closeSidenav() {
		this.closeSidenavStart.emit();
	}
    
    public goToFields() {
		this.closeSidenav();
        this.router.navigate(['deas','fields']);
    }
    
    public goToIdeas() {
        this.closeSidenav();
        this.router.navigate(['work','ideas']);
    }
	
    public goToTasks() {
        this.closeSidenav();
        this.router.navigate(['work','tasks']);
    }
	
    public goToProjects() {
        this.closeSidenav();
        this.router.navigate(['work','projects']);
    }
	
}
