import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { CONTEXT_FEATURE_NAME, State } from './state';

const getError = (state: State): any => state.error;

const getAcct = (state: State): string => state.acctUID;

const getFields = (state: State): string[] => state.fieldUIDs;

export const selectContextState: MemoizedSelector<object, State> = createFeatureSelector<State>(CONTEXT_FEATURE_NAME);

export const selectContextError: MemoizedSelector<object, any> = createSelector(selectContextState, getError);

export const selectContextAcctUID: MemoizedSelector<object, string> = createSelector(selectContextState, getAcct);

export const selectContextFieldUIDs: MemoizedSelector<object, string[]> = createSelector(selectContextState, getFields);