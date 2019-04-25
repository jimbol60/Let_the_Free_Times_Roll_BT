export const CONTEXT_FEATURE_NAME = 'context';

export interface State {
	acctUID: string | null;
	fieldUIDs: string[] | null;
	error: string;
}

export const initialState: State = {
	acctUID: null,
	fieldUIDs: null,
	error: null
};