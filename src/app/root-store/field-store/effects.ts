import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import * as actions from './actions';
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { FieldModel } from "../../common/models";
import { ALERT_TYPES, AlertService } from "../../common/components/alert";
import { Update } from "@ngrx/entity";
import { FieldService } from "../../deas/fields/field.service";

@Injectable()
export class FieldStoreEffects {
	
	constructor(private actions$: Actions,
				private alertService: AlertService,
				private service: FieldService) {}
	
	@Effect({dispatch: false})
	loadRequestEffect$: Observable<Action> = this.actions$.pipe(
		ofType<actions.LoadRequest>(actions.ActionTypes.LOAD_REQUEST),
	);
	
	@Effect()
	AddRequestEffect$ = this.actions$.pipe(
		ofType<actions.AddRequest>(actions.ActionTypes.ADD_REQUEST),
		switchMap(action => {
			return this.service.create(action.payload.obj).pipe(
				map((obj: FieldModel) => new actions.AddSuccess({obj})),
				catchError(error => of(new actions.AddFail({error})))
			);
		})
	);
	
	@Effect({dispatch: false})
	AddSuccess$ = this.actions$.pipe(
		ofType<actions.AddSuccess>(actions.ActionTypes.ADD_SUCCESS),
		tap(action => {
			this.alertService.showAlert({
				Type: ALERT_TYPES.success,
				Summary: "Added: " + action.payload.obj.Summary
			});
		})
	);
	
	@Effect({dispatch: false})
	AddFail$ = this.actions$.pipe(
		ofType<actions.AddFail>(actions.ActionTypes.ADD_FAIL),
		tap(action => {
			this.alertService.showAlert({
				Type: ALERT_TYPES.danger,
				Summary: action.payload.error
			});
		})
	);
	
	@Effect()
	UpdateRequest$ = this.actions$.pipe(
		ofType<actions.UpdateRequest>(actions.ActionTypes.UPDATE_REQUEST),
		switchMap(action => {
			return this.service.update(action.payload.obj).pipe(
				map((obj: FieldModel) => {
					
					const update: Update<FieldModel> = {
						id: obj.UID,
						changes: obj
					};
					
					return new actions.UpdateSuccess({obj: update})
				}),
				catchError(error => of(new actions.UpdateFail({error})))
			);
		})
	);
	
	@Effect({dispatch: false})
	UpdateSuccess$ = this.actions$.pipe(
		ofType<actions.UpdateSuccess>(actions.ActionTypes.UPDATE_SUCCESS),
		tap(action => {
			this.alertService.showAlert({
				Type: ALERT_TYPES.success,
				Summary: "Updated: " + action.payload.obj.changes.Summary
			});
		})
	);
	
	@Effect({dispatch: false})
	UpdateFail$ = this.actions$.pipe(
		ofType<actions.UpdateFail>(actions.ActionTypes.UPDATE_FAIL),
		tap(action => {
			this.alertService.showAlert({
				Type: ALERT_TYPES.danger,
				Summary: action.payload.error
			});
		})
	);
	
	@Effect()
	DeleteOneRequest$ = this.actions$.pipe(
		ofType<actions.DeleteRequest>(actions.ActionTypes.DELETE_REQUEST),
		switchMap(action => {
			return this.service.delete(action.payload.UID).pipe(
				map((count) => {
					return new actions.DeleteSuccess({UID: action.payload.UID})
				}),
				catchError(error => of(new actions.DeleteFail({error})))
			);
		})
	);
}