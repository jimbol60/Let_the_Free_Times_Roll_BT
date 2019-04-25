import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as contextActions from './actions';
import { map, tap } from 'rxjs/operators';
import { ALERT_TYPES, AlertLogService, AlertModel, AlertService } from "../../common/components/alert";
import * as IdeaActions from '../idea-store/actions';

@Injectable()
export class ContextStoreEffects {
	
	constructor(private actions$: Actions,
				private alertService: AlertService,
				private alertLogService: AlertLogService) {}
	
	@Effect({dispatch: false})  // [ ] TODO GB20190105154745: contextSetAcct does not currently have a side effect
	contextSetAcct: Observable<Action> = this.actions$.pipe(
		ofType<contextActions.ContextSetAcctUID>(
			contextActions.ActionTypes.CONTEXT_SET_ACCT
		)
	);
	
	@Effect({dispatch: false})
	contextSetFields: Observable<Action> = this.actions$.pipe(
		ofType<contextActions.ContextSetFieldUIDs>(contextActions.ActionTypes.CONTEXT_SET_FIELDS),
		tap((action: contextActions.ContextSetFieldUIDs) => {
			
			if (action.payload.fieldUIDs && action.payload.fieldUIDs.length > 0) {
				this.alertLogService.addAlert({
					Type: ALERT_TYPES.info,
					Summary: "context fields count: " + action.payload.fieldUIDs.length
				});
			} else {
				const error = 'context fieldUIDs do not exist or are not loaded!';
				let alert: AlertModel = {
					Type: ALERT_TYPES.danger,
					Summary: error,
					Detail: "",
					CreatedAt: Date(),
				};
				this.alertService.showAlert(alert, true);
			}
		}),
	);
}