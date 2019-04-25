import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { TaskModel } from '../../common/models';

export const TASK_FEATURE_NAME = 'tasks';

export const adapter: EntityAdapter<TaskModel> = createEntityAdapter<TaskModel>({
	selectId: (model: TaskModel) => model.UID,
	sortComparer: false
});

export interface State extends EntityState<TaskModel> {
	isLoading?: boolean;
	error?: any;
}

export const initialState: State = adapter.getInitialState(
	{
		isLoading: false,
		error: null
	}
);