import { Injectable } from '@angular/core';

import { ProjectModel } from '../../common/models';
import { DataService } from "../../common/data/data.service";

@Injectable()
export class ProjectService {
	
	private apiResource = 'api/projects/';
	
	constructor(private dataService: DataService) {}
	
	
	public retrieveAll() {
		return this.dataService.httpGetRequest(this.apiResource);
	}
	
	public retrieveOne(UID: string) {
	
	}
	
	public create(obj: ProjectModel) {
		return this.dataService.httpPostRequest(this.apiResource, {obj}, true);
	}
	
	public update(obj: ProjectModel) {
		const url = this.apiResource + obj.UID;
		return this.dataService.httpPutRequest(url, {obj});
	}
	
	public delete(UID: string) {
		const url = this.apiResource + UID;
		return this.dataService.httpDeleteRequest(url);
	}
	
}
