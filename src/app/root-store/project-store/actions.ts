import { Action } from '@ngrx/store';
import { Update } from "@ngrx/entity";
import { ProjectModel } from '../../common/models';

export enum ActionTypes {
	LOAD_REQUEST = '[Project] Load Request',
	LOAD_SUCCESS = '[Project] Load Success',
	LOAD_FAIL = '[Project] Load Fail',
	ADD_REQUEST = '[Project] Add Request',
	ADD_SUCCESS = '[Project] Add Success',
	ADD_FAIL = '[Project] Add Fail',
	UPDATE_REQUEST = '[Project] Update Request',
	UPDATE_SUCCESS = '[Project] Update Success',
	UPDATE_FAIL = '[Project] Update Fail',
	DELETE_REQUEST = '[Project] Delete Request',
	DELETE_SUCCESS = '[Project] Delete Success',
	DELETE_FAIL = '[Project] Delete Fail',
	CLEAR_ALL = '[Project] Clear all'
}

export class LoadRequest implements Action {
	readonly type = ActionTypes.LOAD_REQUEST;
}

export class LoadSuccess implements Action {
	readonly type = ActionTypes.LOAD_SUCCESS;
	constructor(public payload: { objs: ProjectModel[] }) {}
}

export class LoadFail implements Action {
	readonly type = ActionTypes.LOAD_FAIL;
	constructor(public payload: { error: string }) {}
}

export class AddRequest implements Action {
	readonly type = ActionTypes.ADD_REQUEST;
	constructor(public payload: { obj: ProjectModel }) {}
}

export class AddFail implements Action {
	readonly type = ActionTypes.ADD_FAIL;
	constructor(public payload: { error: string }) {}
}

export class AddSuccess implements Action {
	readonly type = ActionTypes.ADD_SUCCESS;
	constructor(public payload: { obj: ProjectModel }) {}
}

export class UpdateRequest implements Action {
	readonly type = ActionTypes.UPDATE_REQUEST;
	constructor(public payload: { obj: ProjectModel }) {}
}

export class UpdateFail implements Action {
	readonly type = ActionTypes.UPDATE_FAIL;
	constructor(public payload: { error: string }) {}
}

export class UpdateSuccess implements Action {
	readonly type = ActionTypes.UPDATE_SUCCESS;
	constructor(public payload: { obj: Update<ProjectModel> }) {}
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