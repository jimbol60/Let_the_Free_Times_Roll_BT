import { Action } from '@ngrx/store';
import { TaskModel } from '../../common/models';
import { Update } from "@ngrx/entity";

export enum ActionTypes {
	LOAD_REQUEST = '[Task] Load Request',
	LOAD_FAIL = '[Task] Load Fail',
	LOAD_SUCCESS = '[Task] Load Success',
	ADD_REQUEST = '[Task] Add Request',
	ADD_FAIL = '[Task] Add Fail',
	ADD_SUCCESS = '[Task] Add Success',
	UPDATE_REQUEST = '[Task] Update Request',
	UPDATE_FAIL = '[Task] Update Fail',
	UPDATE_SUCCESS = '[Task] Update Success',
	DELETE_REQUEST = '[Task] Delete Request',
	DELETE_FAIL = '[Task] Delete Fail',
	DELETE_SUCCESS = '[Task] Delete Success',
	CLEAR_ALL = '[Task] Clear all'
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
	constructor(public payload: { tasks: TaskModel[] }) {}
}

export class AddRequest implements Action {
	readonly type = ActionTypes.ADD_REQUEST;
	constructor(public payload: { task: TaskModel }) {}
}

export class AddFail implements Action {
	readonly type = ActionTypes.ADD_FAIL;
	constructor(public payload: { error: string }) {}
}

export class AddSuccess implements Action {
	readonly type = ActionTypes.ADD_SUCCESS;
	constructor(public payload: { task: TaskModel }) {}
}

export class UpdateRequest implements Action {
	readonly type = ActionTypes.UPDATE_REQUEST;
	constructor(public payload: { task: TaskModel }) {}
}

export class UpdateFail implements Action {
	readonly type = ActionTypes.UPDATE_FAIL;
	constructor(public payload: { error: string }) {}
}

export class UpdateSuccess implements Action {
	readonly type = ActionTypes.UPDATE_SUCCESS;
	constructor(public payload: { task: Update<TaskModel> }) {}
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