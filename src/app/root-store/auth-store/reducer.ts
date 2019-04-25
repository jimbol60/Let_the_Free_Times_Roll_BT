import { Actions, ActionTypes } from "./actions";
import { initialState, State } from './state';

export function authReducer(state = initialState, action: Actions): State {
	switch (action.type) {
		
		/*
		Only change the state which needs to change at this point in time
		 */
		
		case ActionTypes.LOGIN: {
			return {
				...state,
				isLoading: true
			};
		}
		case ActionTypes.LOGIN_SUCCESS: {
			return {
				...state,
				user: action.payload.user,
				login: action.payload.login,
				token: action.payload.token,
				error: null,
				isLoading: false,
				isLoggedIn: true,
			};
		}
		case ActionTypes.LOGIN_FAIL: {
			return {
				...state,
				user: null,
				login: null,
				token: null,
				error: action.payload.error,
				isLoading: false,
				isLoggedIn: false
			};
		}
		case ActionTypes.LOGIN_FROM_TOKEN: {
			return {
				...state,
				isLoading: true
			};
		}
		case ActionTypes.REGISTER: {
			return {
				...state,
				isLoading: true
			};
		}
		case ActionTypes.REGISTER_SUCCESS: {
			return {
				...state,
				user: action.payload.user,
				login: action.payload.login,
				token: action.payload.token,
				error: null,
				isLoading: false,
				isLoggedIn: true,
			};
		}
		case ActionTypes.REGISTER_FAIL: {
			return {
				...state,
				user: null,
				login: null,
				token: null,
				error: action.payload.error,
				isLoading: false,
				isLoggedIn: false
			};
		}
		
		case ActionTypes.LOGOUT: {
			return {
				...state,
			}
		}
		
		case ActionTypes.LOGOUT_SUCCESS: {
			return {
				...state,
				user: null,
				login: null,
				token: null,
				error: null,
				isLoading: false,
				isLoggedIn: false,
			};
		}
		
		case ActionTypes.LOGOUT_FAIL: {
			return {
				...state,
				user: null,
				login: null,
				token: null,
				error: action.payload.error,
				isLoading: false,
				isLoggedIn: false
			}
		}
		
		default:
			return state;
	}
}
