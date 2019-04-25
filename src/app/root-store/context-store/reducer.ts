import { Actions, ActionTypes } from './actions';
import { initialState, State } from './state';

export function contextReducer(state = initialState, action: Actions): State {
    
    let fieldUIDs = [];
	
	switch (action.type) {
		case ActionTypes.CONTEXT_SET_ACCT:
			return {
				...state,
				acctUID: action.payload.acctUID,
				error: null
			};
		case ActionTypes.CONTEXT_SET_FIELDS:
			return {
				...state,
				fieldUIDs: action.payload.fieldUIDs,
				error: null
			};
		case ActionTypes.CONTEXT_ADD_FIELD:
            
            fieldUIDs = [...state.fieldUIDs];
			fieldUIDs.push(action.payload.fieldUID);
   
			return {
				...state,
				fieldUIDs: fieldUIDs,
				error: null
			};
		case ActionTypes.CONTEXT_REMOVE_FIELD:
			
			const index = state.fieldUIDs.indexOf(action.payload.fieldUID);
			fieldUIDs = [...state.fieldUIDs];
            
            if (index >= 0) {
                fieldUIDs.splice(index, 1);
            }
			
			return {
				...state,
                fieldUIDs: fieldUIDs,
				error: null
			};
		case ActionTypes.CLEAR_ALL:
			return {
				acctUID: null,
				fieldUIDs: null,
				error: null
			};
		default: {
			return state;
		}
	}
}