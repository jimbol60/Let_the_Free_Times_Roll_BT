/**
 * An alert log is made when the application gives the user an alert.
 * If the user misses or wishes to review the alert, they can simply go to
 * this log to do so.
 */
export class AlertModel {
	
	public Type?: AlertType;
	public Summary?: string;
	public Detail?: string;
	public CreatedAt?: string;
	
	constructor( obj: AlertModel = {} as AlertModel ) {
		
		let {
			Type = ALERT_TYPES.info,
			Summary = "",
			Detail = null,
			CreatedAt = Date(),
		} = obj;
		
		this.Type = Type;
		this.Summary = Summary;
		this.Detail = Detail;
		this.CreatedAt = CreatedAt;
	}
}

export interface AlertType {
	name: string;
	style: string;
	icon: string;
}

export const ALERT_TYPES = {
	info: {
		name: 'info',
		style: 'alert alert-info alert-dismissible fade show',
		icon: 'info'
	},
	success: {
		name: 'success',
		style: 'alert alert-success alert-dismissible fade show',
		icon: 'check_circle'
	},
	warning: {
		name: 'warning',
		style: 'alert alert-warning alert-dismissible fade show',
		icon: 'warning'
	},
	danger: {
		name: 'danger',
		style: 'alert alert-danger alert-dismissible fade show',
		icon: 'error'
	},
};

export const ALERT_TYPE_LIST: AlertType[] = [
	ALERT_TYPES.info,
	ALERT_TYPES.success,
	ALERT_TYPES.warning,
	ALERT_TYPES.danger
];