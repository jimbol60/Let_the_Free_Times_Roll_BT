import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

import { IdeaModel } from '../../common/models';

import { adapter, IDEA_FEATURE_NAME, State } from './state';

export const getError = (state: State): any => state.error;

export const getIsLoading = (state: State): boolean => state.isLoading;

export const selectIdeaState: MemoizedSelector<object, State> = createFeatureSelector<State>(IDEA_FEATURE_NAME);

export const selectAllIdeas: (state: object) => IdeaModel[] = adapter.getSelectors(selectIdeaState).selectAll;

export const selectIdeaById = (id: string) =>
	createSelector(selectAllIdeas, (allIdeas: IdeaModel[]) => {
		if (allIdeas) {
			return allIdeas.find(p => p.UID === id);
		} else {
			return null;
		}
	});

export const selectIdeaError: MemoizedSelector<object, any> = createSelector(selectIdeaState, getError);

export const selectIdeaIsLoading: MemoizedSelector<object, boolean> = createSelector(selectIdeaState, getIsLoading);