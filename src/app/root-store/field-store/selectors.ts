import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

import { FieldModel } from '../../common/models';

import { adapter, FIELDS_FEATURE_NAME, State } from './state';

export const getError = (state: State): any => state.error;

export const getIsLoading = (state: State): boolean => state.isLoading;

export const selectFieldState: MemoizedSelector<object, State> = createFeatureSelector<State>(FIELDS_FEATURE_NAME);

export const selectAllFields: (state: object) => FieldModel[] = adapter.getSelectors(selectFieldState).selectAll;

export const selectFieldById = (id: string) =>
	createSelector(selectAllFields, (allFields: FieldModel[]) => {
		if (allFields) {
			return allFields.find(p => p.UID === id);
		} else {
			return null;
		}
	});

export const selectFieldError: MemoizedSelector<object, any> = createSelector(selectFieldState, getError);

export const selectFieldIsLoading: MemoizedSelector<object, boolean> = createSelector(selectFieldState, getIsLoading);