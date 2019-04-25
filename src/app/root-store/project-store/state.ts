import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ProjectModel } from '../../common/models';

export const PROJECT_FEATURE_NAME = 'projects';

export const adapter: EntityAdapter<ProjectModel> = createEntityAdapter<ProjectModel>({
	selectId: (model: ProjectModel) => model.UID,
	sortComparer: false
});

export interface State extends EntityState<ProjectModel> {
	isLoading?: boolean;
	error?: any;
}

export const initialState: State = adapter.getInitialState(
	{
		isLoading: false,
		error: null
	}
);