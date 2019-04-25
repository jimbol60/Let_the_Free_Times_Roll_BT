import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'

import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { ContextModel } from "../models";
import { Store } from "@ngrx/store";
import { RootStoreState } from '../../root-store'
import { ContextStoreSelectors } from '../../root-store/context-store'


@Injectable()
export class DataService {
	
	private httpHeaders: HttpHeaders;
	
	readonly baseUrl: string;
	
	private context: ContextModel = new ContextModel();
	
	public constructor(private http: HttpClient,
					   private store: Store<RootStoreState.State>) {
		
		console.log('# data.service.constructor');
		
		// set our base URL from the environment
		this.baseUrl = environment.appUrl;
		
		// we are only dealing in json
		this.httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
		
		this.store.select(ContextStoreSelectors.selectContextState)
			.subscribe(context => {
				
				if (context) {
					if (context.acctUID) {
						this.context.acctUID = context.acctUID;
					}
					if (context.fieldUIDs) {
						this.context.fieldUIDs = context.fieldUIDs;
					}
				}
			});
	}
	
	private addContextHeaders() {
		
		// I only want to send the uids, not full objects // [ ] TODO GB20190108171631: This is in prep to fix the context model. Do that, fix the select in the constructor, then remove this todo.
		let context = {};
		context[ 'acctUID' ] = this.context.acctUID;
		context[ 'fieldUIDs' ] = this.context.fieldUIDs;
		
		const strContext = JSON.stringify(context);
		
		this.httpHeaders = this.addHeader(this.httpHeaders, 'context', strContext);
	}
	
	private getURL(url: string): string {
		url = this.baseUrl + url;
		return url;
	}
	
	private addHeader(header: HttpHeaders, key: string, val: string): HttpHeaders {
		header = header.delete(key);
		header = header.append(key, val);
		
		return header;
	}
	
	/**
	 *
	 * @param url
	 * @param urlParams
	 */
	public httpGetRequest<T>(url: string, urlParams?: HttpParams): Observable<T> {
		
		const reqId = Date.now();
		console.log(`GET ${url} (s: ${reqId})`);
		
		this.addContextHeaders();
		
		if (urlParams === undefined) {
			return this.http.get<T>(this.getURL(url), {headers: this.httpHeaders})
				.pipe(
					map(response => {
						console.log(`GET ${url} (c: ${reqId})`);
						return response;
					})
				)
		} else {
			return this.http.get<T>(this.getURL(url), {params: urlParams, headers: this.httpHeaders})
				.pipe(
					map(response => {
						console.log(`GET ${url} (c: ${reqId})`);
						return response;
					})
				);
		}
	}
	
	/**
	 *
	 * @param url
	 * @param payload
	 * @param isAuth boolean Does the post require use of the authorization token we have?
	 */
	public httpPostRequest<T>(url: string, payload: any, isAuth: boolean): Observable<T> {
		
		const reqId = Date.now();
		console.log(`POST ${url} (s: ${reqId})`);
		
		if (isAuth) {
			this.addContextHeaders();
		}
		
		return this.http.post<T>(this.getURL(url), JSON.stringify(payload), {headers: this.httpHeaders})
			.pipe(
				map(response => {
					console.log(`POST ${url} (c: ${reqId})`);
					return response;
				})
			)
	}
	
	/**
	 *
	 * @param url
	 * @param payload
	 */
	public httpPutRequest<T>(url: string, payload: any): Observable<T> {
		
		const reqId = Date.now();
		console.log(`PUT ${url} (s: ${reqId})`);
		
		this.addContextHeaders();
		
		return this.http.put<T>(this.getURL(url), JSON.stringify(payload), {headers: this.httpHeaders})
			.pipe(
				map(response => {
					console.log(`PUT ${url} (c: ${reqId})`);
					return response;
				})
			)
	}
	
	/**
	 *
	 * @param url
	 */
	public httpDeleteRequest<T>(url: string): Observable<T> {
		
		const reqId = Date.now();
		console.log(`DELETE ${url} (s: ${reqId})`);
		
		this.addContextHeaders();
		
		return this.http.delete<T>(this.getURL(url), {headers: this.httpHeaders})
			.pipe(
				map(response => {
					console.log(`DELETE ${url} (c: ${reqId})`);
					return response;
				})
			)
	}
}