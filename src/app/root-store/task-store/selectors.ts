import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { TaskModel } from '../../common/models';
import { adapter, TASK_FEATURE_NAME, State } from './state';


export const getError = (state: State): any => state.error;

export const getIsLoading = (state: State): boolean => state.isLoading;

export const selectTaskState: MemoizedSelector<object, State> = createFeatureSelector<State>(TASK_FEATURE_NAME);

export const selectAllTasks: (state: object) => TaskModel[] = adapter.getSelectors(selectTaskState).selectAll;

export const selectTaskById = (id: string) => createSelector(selectAllTasks, (allTasks: TaskModel[]) => {
	
	if (allTasks) {
			return allTasks.find(p => p.UID === id);
		} else {
			return null;
		}
	});

export const selectTaskError: MemoizedSelector<object, any> = createSelector(selectTaskState, getError);

export const selectTaskIsLoading: MemoizedSelector<object, boolean> = createSelector(selectTaskState, getIsLoading);