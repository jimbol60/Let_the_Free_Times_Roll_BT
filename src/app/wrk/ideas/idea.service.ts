import { Injectable } from '@angular/core';

import { IdeaModel } from "../../common/models";
import { DataService } from "../../common/data/data.service";
import { map } from "rxjs/operators";

@Injectable()
export class IdeaService {
	
	private apiResource = 'api/ideas/';
	
	constructor(private dataService: DataService) {}
	
	
	public retrieveIdeas() {
		
		const url = this.apiResource;
		
		return this.dataService.httpGetRequest(url).pipe(
			map((data) => {
				return data;
			})
		)
	}
	
	public retrieveIdea(ideaUID: string) {
	
	}
	
	public createIdea(idea: IdeaModel) {
		
		const url = this.apiResource;
		
		return this.dataService.httpPostRequest(url, {idea}, true).pipe(
			map((data) => {
				return data;
			})
		)
	}
	
	public updateIdea(idea: IdeaModel) {
		
		const url = this.apiResource + idea.UID;
		
		return this.dataService.httpPutRequest(url, {idea}).pipe(
			map((data) => {
				return data;
			})
		)
	}
	
	public deleteIdea(UID: string) {
		const url = this.apiResource + UID;
		
		return this.dataService.httpDeleteRequest(url).pipe(
			map((data) => {
				return data;
			})
		)
	}
	
}
