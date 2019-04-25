import { Actions, ActionTypes } from './actions';
import { adapter, initialState, State } from './state';

export function taskReducer(state = initialState, action: Actions): State {
	switch (action.type) {
		case ActionTypes.LOAD_REQUEST: {
			return {
				...state,
				isLoading: true,
				error: null
			};
		}
		case ActionTypes.LOAD_SUCCESS: {
            
			return adapter.addAll(action.payload.tasks, {
				...state,
				isLoading: false,
				error: null
			});
		}
		case ActionTypes.LOAD_FAIL: {
			return {
				...state,
				isLoading: false,
				error: action.payload.error
			};
		}
		case ActionTypes.ADD_REQUEST: {
			return {
				...state,
				isLoading: true,
				error: null
			};
		}
		case ActionTypes.ADD_SUCCESS: {
			return adapter.addOne(action.payload.task,{ // [ ] TODO GB20190108133820: Should we add upon request or upon success?
				...state,
				isLoading: false,
				error: null
			});
		}
		case ActionTypes.ADD_FAIL: {
			return {
				...state,
				isLoading: false,
				error: action.payload.error
			};
		}
		case ActionTypes.UPDATE_REQUEST: {
			return {
				...state,
				isLoading: true,
				error: null
			};
		}
		case ActionTypes.UPDATE_SUCCESS: {
			return adapter.updateOne(action.payload.task,{ // [ ] TODO GB20190108133820: Should we add upon request or upon success?
				...state,
				isLoading: false,
				error: null
			});
		}
		case ActionTypes.UPDATE_FAIL: {
			return {
				...state,
				isLoading: false,
				error: action.payload.error
			};
		}
		case ActionTypes.DELETE_REQUEST: {
			return {
				...state,
				isLoading: true,
				error: null
			};
		}
		case ActionTypes.DELETE_SUCCESS: {
            
            return adapter.removeOne(action.payload.UID,{  // NOTE: this is actually correct, even though showing error
                ...state,
                isLoading: false,
                error: null
            });
		}
		case ActionTypes.DELETE_FAIL: {
			return {
				...state,
				isLoading: false,
				error: action.payload.error
			};
		}
		case ActionTypes.CLEAR_ALL: {
			return adapter.removeAll({
				...state,
				isLoading: false,
				error: null
			})
		}
		default: {
			return state;
		}
	}
}