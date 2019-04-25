import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertModel } from "../alert.model";
import { Subscription } from "rxjs";
import { AlertLogService } from "./alert-log.service";

@Component({
	selector: 'gci-alert-log',
	templateUrl: './alert-log.component.html',
	styleUrls: [ './alert-log.component.scss' ]
})
export class AlertLogComponent implements OnInit, OnDestroy {
	
	// [ ] TODO GB20181222181816: convert the alert log list here to a table or something which is sortable or even filterable...
	
	public alertLog: AlertModel[] = [];
	
	private subscription: Subscription;
	
	constructor(private alertLogService: AlertLogService) {
	}
	
	ngOnInit() {
		
		this.subscription = this.alertLogService.alertLog$.subscribe(messages => {
			this.alertLog = messages;
		});
		
	}
	
	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
	
	public onDismiss(index: number) {
		this.alertLogService.removeAlert(index);
	}
	
}
