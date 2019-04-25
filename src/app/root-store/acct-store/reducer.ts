import { Actions, ActionTypes } from './actions';
import { acctAdapter, initialState, State } from './state';

export function acctReducer(state = initialState, action: Actions): State {
	switch (action.type) {
		case ActionTypes.LOAD_ACCTS: {
			return {
				...state,
				isLoaded: false,
				isLoading: true,
				error: null
			};
		}
		case ActionTypes.LOAD_ACCTS_SUCCESS: {
			return acctAdapter.addAll(action.payload.accts, {
				...state,
				isLoaded: true,
				isLoading: false,
				error: null
			});
		}
		case ActionTypes.LOAD_ACCTS_FAIL: {
			return {
				...state,
				isLoaded: false,
				isLoading: false,
				error: action.payload.error
			};
		}
		case ActionTypes.CLEAR_ACCTS: {
			return acctAdapter.removeAll({
				...state,
				isLoaded: false,
				isLoading: false,
				error: null
			});
		}
		default: {
			return state;
		}
	}
}