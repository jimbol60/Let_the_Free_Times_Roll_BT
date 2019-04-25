import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import * as taskActions from './actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { TaskModel } from '../../common/models';
import { TaskService } from '../../wrk/tasks/task.service';
import { ALERT_TYPES, AlertService } from '../../common/components/alert';
import { Update } from '@ngrx/entity';

@Injectable()
export class taskStoreEffects {
    constructor(private actions$: Actions,
                private alertService: AlertService,
                private taskService: TaskService) {}
    
    @Effect()
    loadRequestEffect$ = this.actions$.pipe(
        ofType<taskActions.LoadRequest>(taskActions.ActionTypes.LOAD_REQUEST),
        switchMap(() => {
            return this.taskService.retrieveAll().pipe(
                map((tasks: TaskModel[]) => new taskActions.LoadSuccess({tasks})),
                catchError(error => of(new taskActions.LoadFail({error})))
            );
        })
    );
    
    @Effect()
    AddRequestEffect$ = this.actions$.pipe(
        ofType<taskActions.AddRequest>(taskActions.ActionTypes.ADD_REQUEST),
        switchMap(action => {
            return this.taskService.create(action.payload.task).pipe(
                map((task: TaskModel) => new taskActions.AddSuccess({task})),
                catchError(error => of(new taskActions.AddFail({error})))
            );
        })
    );
    
    @Effect({dispatch: false})
    AddSuccess$ = this.actions$.pipe(
        ofType<taskActions.AddSuccess>(taskActions.ActionTypes.ADD_SUCCESS),
        tap(action => {
            this.alertService.showAlert({
                Type: ALERT_TYPES.success,
                Summary: 'Added: ' + action.payload.task.Summary
            });
        })
    );
    
    @Effect({dispatch: false})
    AddFail$ = this.actions$.pipe(
        ofType<taskActions.AddFail>(taskActions.ActionTypes.ADD_FAIL),
        tap(action => {
            this.alertService.showAlert({
                Type: ALERT_TYPES.danger,
                Summary: action.payload.error
            });
        })
    );
    
    @Effect()
    UpdateRequest$ = this.actions$.pipe(
        ofType<taskActions.UpdateRequest>(taskActions.ActionTypes.UPDATE_REQUEST),
        switchMap(action => {
            return this.taskService.update(action.payload.task).pipe(
                map((task: TaskModel) => {
                    
                    const update: Update<TaskModel> = {
                        id: task.UID,
                        changes: task
                    };
                    
                    return new taskActions.UpdateSuccess({task: update});
                }),
                catchError(error => of(new taskActions.UpdateFail({error})))
            );
        })
    );
    
    @Effect({dispatch: false})
    UpdateSuccess$ = this.actions$.pipe(
        ofType<taskActions.UpdateSuccess>(taskActions.ActionTypes.UPDATE_SUCCESS),
        tap(action => {
            this.alertService.showAlert({
                Type: ALERT_TYPES.success,
                Summary: 'Updated: ' + action.payload.task.changes.Summary
            });
        })
    );
    
    @Effect({dispatch: false})
    UpdateFail$ = this.actions$.pipe(
        ofType<taskActions.UpdateFail>(taskActions.ActionTypes.UPDATE_FAIL),
        tap(action => {
            this.alertService.showAlert({
                Type: ALERT_TYPES.danger,
                Summary: action.payload.error
            });
        })
    );
    
    @Effect()
    DeleteRequest$ = this.actions$.pipe(
        ofType<taskActions.DeleteRequest>(taskActions.ActionTypes.DELETE_REQUEST),
        switchMap(action => {
            return this.taskService.delete(action.payload.UID).pipe(
                map((count) => {
                    return new taskActions.DeleteSuccess({UID: action.payload.UID});
                }),
                catchError(error => of(new taskActions.DeleteFail({error})))
            );
        })
    );
    
    
}