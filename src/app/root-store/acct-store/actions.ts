import { Action } from '@ngrx/store';
import { AcctModel } from '../../common/models';

export enum ActionTypes {
	LOAD_ACCTS = '[Accts] Load Accounts',
	LOAD_ACCTS_FAIL = '[Accts] Load Accounts Fail',
	LOAD_ACCTS_SUCCESS = '[Accts] Load Accounts Success',
	CLEAR_ACCTS = '[Accts] Clear Accounts',
}

export class LoadAccts implements Action {
	readonly type = ActionTypes.LOAD_ACCTS;
}

export class LoadAcctsFail implements Action {
	readonly type = ActionTypes.LOAD_ACCTS_FAIL;
	constructor(public payload: { error: string }) {}
}

export class LoadAcctsSuccess implements Action {
	readonly type = ActionTypes.LOAD_ACCTS_SUCCESS;
	constructor(public payload: { accts: AcctModel[] }) {}
}

export class ClearAccts implements Action {
	readonly type = ActionTypes.CLEAR_ACCTS;
}

export type Actions =
	| LoadAccts
	| LoadAcctsFail
	| LoadAcctsSuccess
	| ClearAccts;