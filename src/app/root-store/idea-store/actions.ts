import { Action } from '@ngrx/store';
import { IdeaModel } from '../../common/models';
import { Update } from "@ngrx/entity";

export enum ActionTypes {
	LOAD_REQUEST = '[Idea] Load Request',
	LOAD_FAIL = '[Idea] Load Fail',
	LOAD_SUCCESS = '[Idea] Load Success',
	ADD_REQUEST = '[Idea] Add Request',
	ADD_FAIL = '[Idea] Add Fail',
	ADD_SUCCESS = '[Idea] Add Success',
	UPDATE_REQUEST = '[Idea] Update Request',
	UPDATE_FAIL = '[Idea] Update Fail',
	UPDATE_SUCCESS = '[Idea] Update Success',
	DELETE_REQUEST = '[Idea] Delete Request',
	DELETE_FAIL = '[Idea] Delete Fail',
	DELETE_SUCCESS = '[Idea] Delete Success',
	CLEAR_ALL = '[Idea] Clear all'
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
	constructor(public payload: { ideas: IdeaModel[] }) {}
}

export class AddRequest implements Action {
	readonly type = ActionTypes.ADD_REQUEST;
	constructor(public payload: { idea: IdeaModel }) {}
}

export class AddFail implements Action {
	readonly type = ActionTypes.ADD_FAIL;
	constructor(public payload: { error: string }) {}
}

export class AddSuccess implements Action {
	readonly type = ActionTypes.ADD_SUCCESS;
	constructor(public payload: { idea: IdeaModel }) {}
}

export class UpdateRequest implements Action {
	readonly type = ActionTypes.UPDATE_REQUEST;
	constructor(public payload: { idea: IdeaModel }) {}
}

export class UpdateFail implements Action {
	readonly type = ActionTypes.UPDATE_FAIL;
	constructor(public payload: { error: string }) {}
}

export class UpdateSuccess implements Action {
	readonly type = ActionTypes.UPDATE_SUCCESS;
	constructor(public payload: { idea: Update<IdeaModel> }) {}
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