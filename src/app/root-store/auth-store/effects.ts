import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Router } from "@angular/router";
import { Observable, of as observableOf } from 'rxjs';
import { catchError, mergeMap, switchMap, tap } from 'rxjs/operators';

import { AuthService } from "../../auth/auth.service";
import { LOCAL_STORE_TOKEN } from "../../app.config";
import { ALERT_TYPES, AlertLogService, AlertService } from "../../common/components/alert";

import * as AuthActions from './actions'
import { AcctStoreActions } from '../acct-store';
import { ContextStoreActions } from '../context-store';
import { FieldStoreActions } from '../field-store';
import { IdeaStoreActions } from '../idea-store'

@Injectable()
export class AuthStoreEffects {
	
	constructor(private actions$: Actions,
				private router: Router,
				private authService: AuthService,
				private alertService: AlertService,
				private alertLogService: AlertLogService) {}
	
	
	/**
	 * Common function for getting our login setup correct
	 * @param data
	 */
	private commonLoginSetup(data: any): Action[] {
		
		const user = data[ 'user' ];
		const login = data[ 'login' ];
		const token = data[ 'token' ];
		const accts = data[ 'accounts' ];
		const contextAcct = accts[ 0 ]['UID']; // [ ] TODO GB20190105161708: See P103-112
		const fields = data[ 'fields' ];
		let contextFieldUIDs: string[] = [];
		
		for (let field of fields) {
			contextFieldUIDs.push(field.UID);
		}
		
		return [
			// [ ] TODO GB20181231184332: All login actions need to be added to this array
			new AuthActions.LoginSuccess({
				user: user,
				login: login,
				token: token
			}),
			new AcctStoreActions.LoadAcctsSuccess({
				accts: accts
			}),
			new ContextStoreActions.ContextSetAcctUID({
				acctUID: contextAcct
			}),
			new FieldStoreActions.LoadSuccess({
				objs: fields
			}),
			new ContextStoreActions.ContextSetFieldUIDs({
				fieldUIDs: contextFieldUIDs
			})
		]
	}
	
	/**
	 * Common function so that we always logout the same way, no matter which action makes this happen
	 */
	private commonLogoutSetup(): Action[] {
		
		return [
			// [ ] TODO GB20181231183526: Add all states to be cleared upon logout to this array
			
			new AcctStoreActions.ClearAccts(),
			new FieldStoreActions.ClearAll(),
			new ContextStoreActions.ClearAll(),
			new IdeaStoreActions.ClearAll(),
			new AuthActions.LogoutSuccess()
		
		]
	}
	
	@Effect()
	loginEffect$: Observable<Action> = this.actions$.pipe(
		ofType<AuthActions.Login>(AuthActions.ActionTypes.LOGIN),
		mergeMap(action =>
			this.authService.login(action.payload.username, action.payload.password).pipe(
				switchMap(response => this.commonLoginSetup(response)),
				catchError(error => observableOf(new AuthActions.LoginFail({error})))
			)),
	);
	
	@Effect()
	loginFailEffect$: Observable<Action> = this.actions$.pipe(
		ofType<AuthActions.LoginFail>(AuthActions.ActionTypes.LOGIN_FAIL),
		switchMap(() => this.commonLogoutSetup())
	);
	
	@Effect({dispatch: false})
	loginSuccessEffect$: Observable<Action> = this.actions$.pipe(
		ofType<AuthActions.LoginSuccess>(AuthActions.ActionTypes.LOGIN_SUCCESS),
		tap((action: AuthActions.LoginSuccess) => {
			
			// keep token in local storage in case of browser refresh
			localStorage.setItem(LOCAL_STORE_TOKEN, action.payload.token);
			
			this.router.navigate([ '/dashboard' ]);
			
			this.alertLogService.addAlert({
				Type: ALERT_TYPES.success,
				Summary: "Logged in as: " + action.payload.login.Username
			});
		})
	);
	
	@Effect()
	loginFromTokenEffect$: Observable<Action> = this.actions$.pipe(
		ofType<AuthActions.LoginFromToken>(AuthActions.ActionTypes.LOGIN_FROM_TOKEN),
		mergeMap(() =>
			this.authService.checkToken().pipe(
				switchMap(response => this.commonLoginSetup(response)),
				catchError(error => observableOf(new AuthActions.LoginFail({error})))
			)),
	);
	
	@Effect()
	registerEffect$: Observable<Action> = this.actions$.pipe(
		ofType<AuthActions.Register>(AuthActions.ActionTypes.REGISTER),
		mergeMap(action =>
			this.authService.register(action.payload.data).pipe(
				switchMap(response => this.commonLoginSetup(response)),
				catchError(error => observableOf(new AuthActions.RegisterFail({error})))
			)),
	);
	
	
	@Effect()
	LogoutEffect$: Observable<Action> = this.actions$.pipe(
		ofType<AuthActions.Logout>(AuthActions.ActionTypes.LOGOUT),
		mergeMap(() => {
			return this.authService.logout().pipe(
				switchMap(() => this.commonLogoutSetup()),
				catchError(error => observableOf(new AuthActions.LogoutFail({error})))
			);
		})
	);
	
	@Effect()
	LogoutFailEffect$: Observable<Action> = this.actions$.pipe(
		ofType<AuthActions.LogoutFail>(AuthActions.ActionTypes.LOGOUT_FAIL),
		
		// even if we failed on the server side, we still want to logout on the client for security reasons
		switchMap(() => this.commonLogoutSetup())
	);
	
	@Effect({dispatch: false})
	LogoutSuccessEffect$: Observable<Action> = this.actions$.pipe(
		ofType<AuthActions.LogoutSuccess>(AuthActions.ActionTypes.LOGOUT_SUCCESS),
		tap(() => {
			
			// non-store actions
			localStorage.clear();
			
			// clear alert log
			this.alertLogService.clearLog();
			
			this.alertService.showAlert({
				Type: ALERT_TYPES.success,
				Summary: 'Successfully logged out'
			}, false);
			
			// return user to login screen
			this.router.navigate([ '/login' ]);
		})
	);
	
	// allow us to re-login after a browser refresh or even a closed browser IF we have a token stored to do so
	@Effect()
	init$: Observable<Action> = this.actions$.pipe(
		ofType(ROOT_EFFECTS_INIT),
		mergeMap(() =>
			this.authService.checkToken().pipe(
				switchMap(response => this.commonLoginSetup(response)),
				catchError(error => observableOf(new AuthActions.LoginFail({error})))
			)),
	);
}
