import { Injectable } from '@angular/core';

import * as shajs from 'sha.js'; // NOTE: see polyfills.ts file for related fix regarding Ng v6+ bug
import { Observable, throwError } from "rxjs";
import { map } from "rxjs/operators";
import { DataService } from "../common/data/data.service";
import { LOCAL_STORE_TOKEN } from "../app.config";
import { ALERT_TYPES, AlertService } from "../common/components/alert";

@Injectable()
export class AuthService {
	
	private apiResource = 'auth/';
	
	constructor(private dataService: DataService,
				private alertService: AlertService) {}
	
	/**
	 *
	 * @param password string
	 */
	private hashPassword(password: string): string {
		return shajs('sha512').update(password).digest('hex');
	}
	
	/**
	 * Set the authentication based on stored token.
	 */
	public checkToken() {
		if (localStorage.getItem(LOCAL_STORE_TOKEN)) {
			return this.isTokenValid();
		} else {
			return throwError('no token');
		}
	}
	
	/**
	 * Tell us if the token is still a valid token or not. If it is, return token and user so
	 * that we are sure we have all the data we need.
	 *
	 * This uses the HTML Interceptor (auth.interceptor.ts) to
	 * include the token in the params.
	 *
	 */
	private isTokenValid(): Observable<any> {
		const url = this.apiResource + 'checkToken';
		return this.dataService.httpGetRequest(url).pipe(
			map((data) => {
				return data;
			})
		)
	}
	
	/**
	 * Check for a unique email on the server
	 * @param email
	 */
	public checkEmail(email: any) {
		
		const url = this.apiResource + 'checkEmail';
		
		const data = {
			Email: email
		};
		
		return this.dataService.httpPostRequest(url, data, false).pipe(
			map((data: any) => {
				return data;
			})
		);
	}
	
	/**
	 * Check for a unique username on the server
	 * @param username
	 */
	public checkUsername(username: any) {
		
		const url = this.apiResource + 'checkUsername';
		
		const data = {
			Username: username
		};
		
		return this.dataService.httpPostRequest(url, data, false).pipe(
			map((data: any) => {
				return data;
			})
		);
	}
	
	/**
	 * Register a new user
	 */
	public register(formData: any) {
		
		console.log('auth.service.register', formData);
		
		const url = this.apiResource + 'register';
		
		const requestData = {
			Username: formData.Username,
			PasswordHash: this.hashPassword(formData.PasswordHash),
			FirstName: formData.FirstName,
			LastName: formData.LastName,
			Email: formData.Email,
			AcceptTerms: formData.AcceptTerms
		};
		
		return this.dataService.httpPostRequest(url, requestData, false).pipe(
			map((response: any) => {
				return response;
			})
		);
	}
	
	/**
	 * Login and return user, authentication token, and accounts
	 * @param username
	 * @param password
	 */
	public login(username: string, password: string): any {
		
		const url = this.apiResource + 'login';
		
		const data = {
			Username: username,
			PasswordHash: this.hashPassword(password)
		};
		
		console.log('p: ', data.PasswordHash);
		
		return this.dataService.httpPostRequest(url, data, false);
	}
	
	public logout(isTokenCheckOnly: boolean = false) {
		
		const url = this.apiResource + 'logout';
		const data = {};
		
		return this.dataService.httpPostRequest(url, data, true).pipe(
			map(data => {
				
				if (!isTokenCheckOnly) {
					this.alertService.showAlert({
						Type: ALERT_TYPES.success,
						Summary: 'Successfully logged out'
					}, false);
				}
				
				return data;
			})
		);
	}
	
}