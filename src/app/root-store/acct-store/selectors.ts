
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

import { AcctModel } from "../../common/models/acct.model";

import { acctAdapter, ACCTS_FEATURE_NAME, State } from './state';


export const getError = (state: State): any => state.error;

export const getIsLoaded = (state: State): boolean => state.isLoaded;

export const getIsLoading = (state: State): boolean => state.isLoading;

export const selectAcctState: MemoizedSelector<object, State> = createFeatureSelector<State>(ACCTS_FEATURE_NAME);

export const selectAllAccts: (state: object) => AcctModel[] = acctAdapter.getSelectors(selectAcctState).selectAll;

export const selectAcctByUid = (uid: string) =>
	createSelector(this.selectAllAccts, (allAccts: AcctModel[]) => {
		if (allAccts) {
			return allAccts.find(p => p.UID === uid);
		} else {
			return null;
		}
	});

export const selectAcctError: MemoizedSelector<object, any> = createSelector( selectAcctState, getError);

export const selectAcctIsLoaded: MemoizedSelector<object, boolean> = createSelector(selectAcctState, getIsLoaded);

export const selectAcctIsLoading: MemoizedSelector<object, boolean> = createSelector(selectAcctState, getIsLoading);