import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from "@ngrx/store";
import { AuthStoreSelectors, RootStoreState } from '../root-store';

@Injectable()
export class AuthGuard implements CanActivate {
	
	private isAuthenticated: boolean = false;
	
	constructor(private router: Router,
				private store: Store<RootStoreState.State>) {
		
		this.store.select(AuthStoreSelectors.selectAuthIsLoggedIn)
			.subscribe(result => {
				this.isAuthenticated = result;
			});
	}
	
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		
		if (this.isAuthenticated) {
			// if we have authenticated then we return true
			return true;
		} else {
			// if not authenticated, redirect to login page with the return url
			this.router.navigate([ '/login' ], {queryParams: {returnUrl: state.url}});
			return false;
		}
	}
}