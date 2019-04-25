import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { FieldModel } from '../../common/models';

export const FIELDS_FEATURE_NAME = 'field';

export const adapter: EntityAdapter<FieldModel> = createEntityAdapter<FieldModel>({
	selectId: (model: FieldModel) => model.UID,
	sortComparer: false
});

export interface State extends EntityState<FieldModel> {
	isLoading?: boolean;
	error?: any;
}

export const initialState: State = adapter.getInitialState(
	{
		isLoading: false,
		error: null
	}
);