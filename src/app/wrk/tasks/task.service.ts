import { Injectable } from '@angular/core';

import { TaskModel } from '../../common/models';
import { DataService } from "../../common/data/data.service";
import { map } from "rxjs/operators";

@Injectable()
export class TaskService {
	
	private apiResource = 'api/tasks/';
	
	constructor(private dataService: DataService) {}
	
	
	public retrieveAll() {
		
		const url = this.apiResource;
		
		return this.dataService.httpGetRequest(url).pipe(
			map((data) => {
				return data;
			})
		)
	}
	
	public retrieveOne(UID: string) {
	
	}
	
	public create(obj: TaskModel) {
		
		const url = this.apiResource;
		
		return this.dataService.httpPostRequest(url, {obj}, true).pipe(
			map((data) => {
				return data;
			})
		)
	}
	
	public update(obj: TaskModel) {
		
		const url = this.apiResource + obj.UID;
		
		return this.dataService.httpPutRequest(url, {obj}).pipe(
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
