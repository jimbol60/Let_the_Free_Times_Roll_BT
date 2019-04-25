import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class UploadService {
	
	public progress: number;
	public message: string;
	
	constructor(private http: HttpClient) {}
	
	public upload(files) {
		
		const url = 'api/Upload';
		
		const id = Date.now();
		console.log(`POST ${url}: s ${id}`);
		console.log("upload.files:", JSON.stringify(files));
		
		if (files.length === 0)
			return;
		
		const formData = new FormData();
		
		for (let file of files)
			formData.append(file.name, file);
		
		const upload = new HttpRequest('POST', url, formData);
		
		return this.http.request(upload).pipe(
			map(res => {
				console.log(`POST ${url}: c ${id}`);
				return <any>res[ 'body' ];
			})
		)
	}
	
}
