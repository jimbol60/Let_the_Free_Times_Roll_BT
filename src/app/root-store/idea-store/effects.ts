import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import * as ideaActions from './actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { IdeaModel } from '../../common/models';
import { IdeaService } from '../../wrk/ideas/idea.service';
import { ALERT_TYPES, AlertService } from '../../common/components/alert';
import { Update } from '@ngrx/entity';

@Injectable()
export class ideaStoreEffects {
    constructor(private actions$: Actions,
                private alertService: AlertService,
                private ideaService: IdeaService) {}
    
    @Effect()
    loadRequestEffect$ = this.actions$.pipe(
        ofType<ideaActions.LoadRequest>(ideaActions.ActionTypes.LOAD_REQUEST),
        switchMap(() => {
            return this.ideaService.retrieveIdeas().pipe(
                map((ideas: IdeaModel[]) => new ideaActions.LoadSuccess({ideas})),
                catchError(error => of(new ideaActions.LoadFail({error})))
            );
        })
    );
    
    @Effect()
    AddRequestEffect$ = this.actions$.pipe(
        ofType<ideaActions.AddRequest>(ideaActions.ActionTypes.ADD_REQUEST),
        switchMap(action => {
            return this.ideaService.createIdea(action.payload.idea).pipe(
                map((idea: IdeaModel) => new ideaActions.AddSuccess({idea})),
                catchError(error => of(new ideaActions.AddFail({error})))
            );
        })
    );
    
    @Effect({dispatch: false})
    AddSuccess$ = this.actions$.pipe(
        ofType<ideaActions.AddSuccess>(ideaActions.ActionTypes.ADD_SUCCESS),
        tap(action => {
            this.alertService.showAlert({
                Type: ALERT_TYPES.success,
                Summary: 'Added idea: ' + action.payload.idea.Summary
            });
        })
    );
    
    @Effect({dispatch: false})
    AddFail$ = this.actions$.pipe(
        ofType<ideaActions.AddFail>(ideaActions.ActionTypes.ADD_FAIL),
        tap(action => {
            this.alertService.showAlert({
                Type: ALERT_TYPES.danger,
                Summary: action.payload.error
            });
        })
    );
    
    @Effect()
    UpdateRequest$ = this.actions$.pipe(
        ofType<ideaActions.UpdateRequest>(ideaActions.ActionTypes.UPDATE_REQUEST),
        switchMap(action => {
            return this.ideaService.updateIdea(action.payload.idea).pipe(
                map((idea: IdeaModel) => {
                    
                    const update: Update<IdeaModel> = {
                        id: idea.UID,
                        changes: idea
                    };
                    
                    return new ideaActions.UpdateSuccess({idea: update});
                }),
                catchError(error => of(new ideaActions.UpdateFail({error})))
            );
        })
    );
    
    @Effect({dispatch: false})
    UpdateSuccess$ = this.actions$.pipe(
        ofType<ideaActions.UpdateSuccess>(ideaActions.ActionTypes.UPDATE_SUCCESS),
        tap(action => {
            this.alertService.showAlert({
                Type: ALERT_TYPES.success,
                Summary: 'Updated idea: ' + action.payload.idea.changes.Summary
            });
        })
    );
    
    @Effect({dispatch: false})
    UpdateFail$ = this.actions$.pipe(
        ofType<ideaActions.UpdateFail>(ideaActions.ActionTypes.UPDATE_FAIL),
        tap(action => {
            this.alertService.showAlert({
                Type: ALERT_TYPES.danger,
                Summary: action.payload.error
            });
        })
    );
    
    @Effect()
    DeleteOneRequest$ = this.actions$.pipe(
        ofType<ideaActions.DeleteRequest>(ideaActions.ActionTypes.DELETE_REQUEST),
        switchMap(action => {
            return this.ideaService.deleteIdea(action.payload.UID).pipe(
                map((count) => {
                    return new ideaActions.DeleteSuccess({UID: action.payload.UID});
                }),
                catchError(error => of(new ideaActions.DeleteFail({error})))
            );
        })
    );
    
    
}