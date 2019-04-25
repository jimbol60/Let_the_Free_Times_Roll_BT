import { Injectable, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertService, AlertLogService,ALERT_TYPES, AlertModel } from "../components/alert";
import { Store } from "@ngrx/store";
import * as RootStoreState from "../../root-store/state";
import * as AuthStoreSelectors from "../../root-store/auth-store/selectors";

@Injectable()
export class ErrorInterceptor implements OnInit, HttpInterceptor {
	
	private isLoggedIn: boolean;
	
	constructor(private alertService: AlertService,
				private alertLogService: AlertLogService,
				private store$: Store<RootStoreState.State>,) {}
	
	ngOnInit() {
		// this.store$.select(AuthStoreSelectors.selectAuthIsLoggedIn)
		// 	.subscribe(result => this.isLoggedIn = result);
	}
	
	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		
		// Exceptions - bypass this error handler
		if (request.url.includes('checkEmail')
			|| request.url.includes('checkUsername')
			|| request.url.includes('checkToken')) {
			return next.handle(request);
		}
		
		return next.handle(request).pipe(
			catchError((error: HttpErrorResponse) => {
				
				let errMsg = "";
				
				if (error.error instanceof Error) {
					// A client-side or network error occurred. Handle it accordingly.
					console.error('An error occurred:', error.error.message);
					errMsg = "Something went wrong. A client-side or network error occurred";
				} else {
					
					// [ ] TODO GB20190108115143: Need to look closer at how laravel is sending me error messages and standardize this.
					errMsg = error.error.error;
					
					if (!errMsg) {
						errMsg = "An unknown error occurred on the server :("
					}
					
					console.error(errMsg);
				}
				
				let alert: AlertModel = {
					Type: ALERT_TYPES.danger,
					Summary: errMsg,
					Detail: "",
					CreatedAt: Date(),
				};
				
				// if (this.isLoggedIn) {
				// 	this.alertLogService.addAlert(alert);
				// }
				
				this.alertLogService.addAlert(alert);
				
				this.alertService.showAlert(alert, false);
				
				// If you want to return a new response:
				//return of(new HttpResponse({body: [{name: "Default value..."}]}));
				
				// If you want to return the error on the upper level:
				return throwError(error);
				
				// or just return nothing:
				// return EMPTY;
			})
		);
	}
}