import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { APP_TITLE } from "../../app.config";
import { Store } from "@ngrx/store";
import { AuthStoreSelectors, RootStoreState } from '../../root-store';
import { Observable } from "rxjs";

@Component({
	selector: 'gci-user-login',
	templateUrl: './user-login.component.html',
	styleUrls: [ './user-login.component.scss' ]
})
export class UserLoginComponent implements OnInit {
	
	public appTitle = APP_TITLE;
	
	public returnUrl: string;
	
	public isLoading = false;
	
	public isLoggedIn$: Observable<boolean>;
	
	constructor(private route: ActivatedRoute,
				private router: Router,
				private store$: Store<RootStoreState.State>) {}
	
	ngOnInit() {
		
		// get return url from route parameters or default to '/'
		this.returnUrl = this.route.snapshot.queryParams[ 'returnUrl' ] || '/';
		
		this.isLoggedIn$ = this.store$.select(
			AuthStoreSelectors.selectAuthIsLoggedIn
		);
		
		this.isLoggedIn$.subscribe(result => {
			if (result) {
				this.router.navigate([ this.returnUrl ]);
			}
		})
	}
	
}
