import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable, OnInit } from "@angular/core";
import { LOCAL_STORE_TOKEN } from "../app.config";
import { Store } from "@ngrx/store";
import * as RootStoreState from "../root-store/state";
import * as ContextStoreSelectors from "../root-store/context-store/selectors";
import { ContextModel } from "../common/models";

@Injectable()
export class AuthInterceptor implements OnInit, HttpInterceptor {
	
	private context: ContextModel = new ContextModel();
	
	constructor(private store: Store<RootStoreState.State>) {
		
		// this.store.select(ContextStoreSelectors.selectContextState)
		// 	.subscribe(currentContext => {
		//
		// 		console.log('# auth.intercept.store.select.context');
		//
		// 		if (currentContext) {
		// 			if (currentContext.acct) {
		// 				this.context.AcctUID = currentContext.acct.UID;
		// 			}
		// 			if (currentContext.bound) {
		// 				this.context.fields = currentContext.bound.UID;
		// 			}
		// 		}
		// 	});
	}
	
	ngOnInit() {}
	
	private getToken() {
		let token = localStorage.getItem(LOCAL_STORE_TOKEN);
		if (!token) { token = ''; }
		return token;
	}
	
	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		
		const token = this.getToken();
		
		// If we don't have a token, we are not authorized yet
		if (!token || token === '') {
			return next.handle(request);
		}
		
		let headers = request.headers;
		headers = headers.append('token', token);
		
		// if(this.context) {
		// 	headers = headers.append('context', JSON.stringify(this.context));
		// }
		
		const copiedReq = request.clone({
			headers: headers
		});
		
		console.log('Request Headers for testing in PostMan:', headers); // [ ] TODO GB20190128202420: Testing purposes only. Helps me get the context for PostMan.
		
		return next.handle(copiedReq);
	}
}