import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { ProjectModel } from '../../common/models';
import { adapter, PROJECT_FEATURE_NAME, State } from './state';


export const getError = (state: State): any => state.error;

export const getIsLoading = (state: State): boolean => state.isLoading;

export const selectState: MemoizedSelector<object, State> = createFeatureSelector<State>(PROJECT_FEATURE_NAME);

export const selectAll: (state: object) => ProjectModel[] = adapter.getSelectors(selectState).selectAll;

export const selectByUid = (id: string) => createSelector(selectAll, (allObjs: ProjectModel[]) => {
	
	if (allObjs) {
			return allObjs.find(p => p.UID === id);
		} else {
			return null;
		}
	});

export const selectError: MemoizedSelector<object, any> = createSelector(selectState, getError);

export const selectIsLoading: MemoizedSelector<object, boolean> = createSelector(selectState, getIsLoading);