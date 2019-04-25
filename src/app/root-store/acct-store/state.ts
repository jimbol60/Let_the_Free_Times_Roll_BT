import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { AcctModel } from "../../common/models/acct.model";

export const ACCTS_FEATURE_NAME = 'accts';

export const acctAdapter: EntityAdapter<AcctModel> = createEntityAdapter<AcctModel>({
	selectId: model => model.UID,
	sortComparer: false // this should come in the correct order from the server
});

export interface State extends EntityState<AcctModel> {
	isLoaded?: boolean;
	isLoading?: boolean;
	error?: any;
}

export const initialState: State = acctAdapter.getInitialState(
	{
		isLoaded: false,
		isLoading: false,
		error: null
	}
);