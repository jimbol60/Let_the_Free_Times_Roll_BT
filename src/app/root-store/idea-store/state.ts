import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IdeaModel } from '../../common/models';

export const IDEA_FEATURE_NAME = 'ideas';

export const adapter: EntityAdapter<IdeaModel> = createEntityAdapter<IdeaModel>({
	selectId: (model: IdeaModel) => model.UID,
	sortComparer: false
});

export interface State extends EntityState<IdeaModel> {
	isLoading?: boolean;
	error?: any;
}

export const initialState: State = adapter.getInitialState(
	{
		isLoading: false,
		error: null
	}
);