import { Action } from '@ngrx/store';
import { LoginModel, UserModel } from "../../common/models";

export enum ActionTypes {
	LOGIN = '[Auth] Login',
	LOGIN_FAIL = '[Auth] Login Fail',
	LOGIN_SUCCESS = '[Auth] Login Success',
	LOGIN_FROM_TOKEN = '[Auth] Login from token',
	REGISTER = '[Auth] Register',
	REGISTER_FAIL = '[Auth] Register Fail',
	REGISTER_SUCCESS = '[Auth] Register Success',
	LOGOUT = '[Auth] Logout',
	LOGOUT_FAIL = '[Auth] Logout Fail',
	LOGOUT_SUCCESS = '[Auth] Logout Success',
}

export class Login implements Action {
	readonly type = ActionTypes.LOGIN;
	
	constructor(public payload: { username: string; password: string }) {}
}

export class LoginFail implements Action {
	readonly type = ActionTypes.LOGIN_FAIL;
	
	constructor(public payload: { error: string }) {}
}

export class LoginSuccess implements Action {
	readonly type = ActionTypes.LOGIN_SUCCESS;
	
	constructor(public payload: { user: UserModel, login: LoginModel, token: string }) {}
}

export class LoginFromToken implements Action {
	readonly type = ActionTypes.LOGIN_FROM_TOKEN;
}

export class Register implements Action {
	readonly type = ActionTypes.REGISTER;
	
	constructor(public payload: { data: any }) {}
}

export class RegisterFail implements Action {
	readonly type = ActionTypes.REGISTER_FAIL;
	
	constructor(public payload: { error: string }) {}
}

export class RegisterSuccess implements Action {
	readonly type = ActionTypes.REGISTER_SUCCESS;
	
	constructor(public payload: { user: UserModel, login: LoginModel, token: string }) {}
}

export class Logout implements Action {
	readonly type = ActionTypes.LOGOUT;
}

export class LogoutFail implements Action {
	readonly type = ActionTypes.LOGOUT_FAIL;
	
	constructor(public payload: { error: string }) {}
}

export class LogoutSuccess implements Action {
	readonly type = ActionTypes.LOGOUT_SUCCESS;
}

export type Actions =
	| Login
	| LoginFail
	| LoginSuccess
	| LoginFromToken
	| Register
	| RegisterFail
	| RegisterSuccess
	| Logout
	| LogoutFail
	| LogoutSuccess;
