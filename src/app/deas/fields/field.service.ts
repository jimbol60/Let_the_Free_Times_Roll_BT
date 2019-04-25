import { Injectable } from '@angular/core';
import { FieldModel } from "../../common/models";
import { DataService } from "../../common/data/data.service";
import { map } from "rxjs/operators";

@Injectable()
export class FieldService {
	
	private apiResource = 'api/fields/';
	
	constructor(private dataService: DataService) {}
	
	public retrieveAll() {
		
		const url = this.apiResource;
		
		return this.dataService.httpGetRequest(url).pipe(
			map((data) => {
				return data;
			})
		)
	}
	
	public retrieve(UID: string) {
	
	}
	
	public create(field: FieldModel) {
		
		const url = this.apiResource;
		
		return this.dataService.httpPostRequest(url, {field}, true).pipe(
			map((data) => {
				return data;
			})
		)
	}
	
	public update(field: FieldModel) {
		
		const url = this.apiResource;
		
		return this.dataService.httpPutRequest(url, {field}).pipe(
			map((data) => {
				return data;
			})
		)
	}
	
	public delete(UID: string) {
		const url = this.apiResource + UID;
		
		return this.dataService.httpDeleteRequest(url).pipe(
			map((data) => {
				return data;
			})
		)
	}
	
}
