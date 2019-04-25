import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { AUTH_FEATURE_NAME, State } from './state';
import { UserModel } from "../../common/models/user.model";

const getError = (state: State): any => state.error;

const getToken = (state: State): string => state.token;

const getIsLoading = (state: State): boolean => state.isLoading;

const getIsLoggedIn = (state: State): boolean => state.isLoggedIn;

const getUser = (state: State): any => state.user;

export const selectAuthState: MemoizedSelector<object, State> = createFeatureSelector<State>(AUTH_FEATURE_NAME);

export const selectAuthError: MemoizedSelector<object, any> = createSelector(selectAuthState, getError);

export const selectAuthToken: MemoizedSelector<object, string> = createSelector(selectAuthState, getToken);

export const selectAuthIsLoading: MemoizedSelector<object, boolean> = createSelector(selectAuthState, getIsLoading);

export const selectAuthIsLoggedIn: MemoizedSelector<object, boolean> = createSelector(selectAuthState, getIsLoggedIn);

export const selectAuthUser: MemoizedSelector<object, UserModel> = createSelector(selectAuthState, getUser);

// Keeping as an example --------------------------------------------------------------
// export const selectAuthState = state => state.auth;
// export const isLoggedIn = createSelector(selectAuthState, auth => auth.loggedIn);
// export const isLoggedOut = createSelector(isLoggedIn, loggedIn => !loggedIn);