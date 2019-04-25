import { UserModel, LoginModel } from "../../common/models";

export const AUTH_FEATURE_NAME = 'auth';

export interface State {
	user: UserModel | null,
	login: LoginModel | null,
	token: string | null,
	isLoading: boolean,
	isLoggedIn: boolean,
	error: string;
}

export const initialState: State = {
	user: null,
	login: null,
	token: null,
	isLoading: false,
	isLoggedIn: false,
	error: null,
};

