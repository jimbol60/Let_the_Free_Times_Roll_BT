import { Action } from '@ngrx/store';
import { FieldModel } from "../../common/models";
import { Update } from "@ngrx/entity";

export enum ActionTypes {
	LOAD_REQUEST = '[Field] Load Request',
	LOAD_FAIL = '[Field] Load Failure',
	LOAD_SUCCESS = '[Field] Load Success',
	ADD_REQUEST = '[Field] Add Request',
	ADD_FAIL = '[Field] Add Fail',
	ADD_SUCCESS = '[Field] Add Success',
	UPDATE_REQUEST = '[Field] Update Idea',
	UPDATE_FAIL = '[Field] Update Fail',
	UPDATE_SUCCESS = '[Field] Update Success',
	DELETE_REQUEST = '[Field] Delete Request',
	DELETE_FAIL = '[Field] Delete Fail',
	DELETE_SUCCESS = '[Field] Delete Success',
	CLEAR_ALL = '[Field] Clear All',
}

export class LoadRequest implements Action {
	readonly type = ActionTypes.LOAD_REQUEST;
}

export class LoadFail implements Action {
	readonly type = ActionTypes.LOAD_FAIL;
	
	constructor(public payload: { error: string }) {}
}

export class LoadSuccess implements Action {
	readonly type = ActionTypes.LOAD_SUCCESS;
	
	constructor(public payload: { objs: FieldModel[] }) {}
}

export class AddRequest implements Action {
	readonly type = ActionTypes.ADD_REQUEST;
	
	constructor(public payload: { obj: FieldModel }) {}
}

export class AddFail implements Action {
	readonly type = ActionTypes.ADD_FAIL;
	
	constructor(public payload: { error: string }) {}
}

export class AddSuccess implements Action {
	readonly type = ActionTypes.ADD_SUCCESS;
	
	constructor(public payload: { obj: FieldModel }) {}
}

export class UpdateRequest implements Action {
	readonly type = ActionTypes.UPDATE_REQUEST;
	
	constructor(public payload: { obj: FieldModel }) {}
}

export class UpdateFail implements Action {
	readonly type = ActionTypes.UPDATE_FAIL;
	
	constructor(public payload: { error: string }) {}
}

export class UpdateSuccess implements Action {
	readonly type = ActionTypes.UPDATE_SUCCESS;
	
	constructor(public payload: { obj: Update<FieldModel> }) {}
}

export class DeleteRequest implements Action {
	readonly type = ActionTypes.DELETE_REQUEST;
	
	constructor(public payload: { UID: string }) {}
}

export class DeleteFail implements Action {
	readonly type = ActionTypes.DELETE_FAIL;
	
	constructor(public payload: { error: string }) {}
}

export class DeleteSuccess implements Action {
	readonly type = ActionTypes.DELETE_SUCCESS;
	
	constructor(public payload: { UID: string }) {}
}

export class ClearAll implements Action {
	readonly type = ActionTypes.CLEAR_ALL;
}

export type Actions =
	| LoadRequest
	| LoadFail
	| LoadSuccess
	| AddRequest
	| AddFail
	| AddSuccess
	| UpdateRequest
	| UpdateFail
	| UpdateSuccess
	| DeleteRequest
	| DeleteFail
	| DeleteSuccess
	| ClearAll;