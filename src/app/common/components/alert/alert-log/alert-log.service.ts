import { Injectable } from '@angular/core';

import { Subject } from "rxjs";

import { AlertModel } from "../alert.model";

@Injectable()
export class AlertLogService {
	
	private alertLog: AlertModel[] = [];
	public alertLog$ = new Subject<AlertModel[]>();
	
	constructor() {}
	
	private refreshLog() {
		this.alertLog$.next(this.alertLog.slice());
	}
	
	public clearLog() {
		this.alertLog = [];
		this.refreshLog();
	}
	
	public addAlert(msg: AlertModel) {
		
		msg.CreatedAt = Date();
		
		// using unshift here so that the most recent messages appear on top
		this.alertLog.unshift(msg);
		this.refreshLog();
	}
	
	public removeAlert(index: number) {
		this.alertLog.splice(index, 1);
		this.refreshLog();
	}
	
}
