import { Injectable } from '@angular/core';
import { AlertModel } from "./alert.model";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material";
import { AlertLogService } from "./alert-log/alert-log.service";

@Injectable()
export class AlertService {
	
	constructor(private snackBar: MatSnackBar,
				private alertLogService: AlertLogService) {}
	
	public showAlert(alert: AlertModel, addToLog: boolean = true) {
		
		// See style.scss for snack classes (must be in style.scss because snackbar is applied globally)
		const snackClass = [ 'snackAlert-' + alert.Type.name ];
		
		let config = new MatSnackBarConfig();
		config.verticalPosition = 'bottom';
		config.horizontalPosition = 'center';
		config.duration = 2000;
		config.panelClass = snackClass;
		
		if(addToLog) {
			this.alertLogService.addAlert(alert);
		}
		
		this.snackBar.open(alert.Summary, '', config);
	}
	
	
}