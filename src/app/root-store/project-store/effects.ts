import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Update } from "@ngrx/entity";
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from "rxjs/operators";

import { ALERT_TYPES, AlertService } from "../../common/components/alert";

import { ProjectModel } from "../../common/models";
import * as projActions from './actions';

import { ProjectService } from "../../wrk/projects/project.service";

@Injectable()
export class projStoreEffects {
	constructor(private actions$: Actions,
				private alertService: AlertService,
				private projService: ProjectService) {}
	
	@Effect()
	loadRequestEffect$ = this.actions$.pipe(
		ofType<projActions.LoadRequest>(projActions.ActionTypes.LOAD_REQUEST),
		switchMap(() => {
			return this.projService.retrieveAll().pipe(
				map((objs: ProjectModel[]) => new projActions.LoadSuccess({objs})),
				catchError(error => of(new projActions.LoadFail({error})))
			);
		})
	);
	
	@Effect()
	AddRequestEffect$ = this.actions$.pipe(
		ofType<projActions.AddRequest>(projActions.ActionTypes.ADD_REQUEST),
		switchMap(action => {
			return this.projService.create(action.payload.obj).pipe(
				map((obj: ProjectModel) => new projActions.AddSuccess({obj})),
				catchError(error => of(new projActions.AddFail({error})))
			);
		})
	);
	
	@Effect({dispatch: false})
	AddSuccess$ = this.actions$.pipe(
		ofType<projActions.AddSuccess>(projActions.ActionTypes.ADD_SUCCESS),
		tap(action => {
			this.alertService.showAlert({
				Type: ALERT_TYPES.success,
				Summary: "Added: " + action.payload.obj.Summary
			});
		})
	);
	
	@Effect({dispatch: false})
	AddFail$ = this.actions$.pipe(
		ofType<projActions.AddFail>(projActions.ActionTypes.ADD_FAIL),
		tap(action => {
			this.alertService.showAlert({
				Type: ALERT_TYPES.danger,
				Summary: action.payload.error
			});
		})
	);
	
	@Effect()
	UpdateRequest$ = this.actions$.pipe(
		ofType<projActions.UpdateRequest>(projActions.ActionTypes.UPDATE_REQUEST),
		switchMap(action => {
			return this.projService.update(action.payload.obj).pipe(
				map((obj: ProjectModel) => {
					
					const update: Update<ProjectModel> = {
						id: obj.UID,
						changes: obj
					};
					
					return new projActions.UpdateSuccess({obj: update})
				}),
				catchError(error => of(new projActions.UpdateFail({error})))
			);
		})
	);
	
	@Effect({dispatch: false})
	UpdateSuccess$ = this.actions$.pipe(
		ofType<projActions.UpdateSuccess>(projActions.ActionTypes.UPDATE_SUCCESS),
		tap(action => {
			this.alertService.showAlert({
				Type: ALERT_TYPES.success,
				Summary: "Updated: " + action.payload.obj.changes.Summary
			});
		})
	);
	
	@Effect({dispatch: false})
	UpdateFail$ = this.actions$.pipe(
		ofType<projActions.UpdateFail>(projActions.ActionTypes.UPDATE_FAIL),
		tap(action => {
			this.alertService.showAlert({
				Type: ALERT_TYPES.danger,
				Summary: action.payload.error
			});
		})
	);
	
	@Effect()
	DeleteRequest$ = this.actions$.pipe(
		ofType<projActions.DeleteRequest>(projActions.ActionTypes.DELETE_REQUEST),
		switchMap(action => {
			return this.projService.delete(action.payload.UID).pipe(
				map((count) => {
					return new projActions.DeleteSuccess({UID: action.payload.UID})
				}),
                catchError(error => of(new projActions.DeleteFail({error})))
			);
		})
	);
	
	
}