import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { routerReducer } from "@ngrx/router-store";
import { storeFreeze } from "ngrx-store-freeze";
import { environment } from "../../environments/environment";
import { AuthStoreState } from './auth-store';
import { AcctStoreState } from './acct-store';
import { ContextStoreState } from './context-store';
import { FieldStoreState } from './field-store';
import { IdeaStoreState } from './idea-store';
import { TaskStoreState } from './task-store';
import { ProjStoreState } from './project-store';

export interface State {
	auth: AuthStoreState.State;
	accts: AcctStoreState.State;
	context: ContextStoreState.State;
	bounds: FieldStoreState.State;
	ideas: IdeaStoreState.State;
	tasks: TaskStoreState.State;
	projects: ProjStoreState.State;
}

export const reducers: ActionReducerMap<{}> = {
	router: routerReducer
};

export const metaReducers: MetaReducer<{}>[] = !environment.production ? [ storeFreeze ] : [];