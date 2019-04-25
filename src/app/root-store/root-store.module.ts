import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreRouterConnectingModule } from "@ngrx/router-store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

import { environment } from "../../environments/environment";
import { reducers, metaReducers } from "./state";
import { AuthStoreModule } from './auth-store';
import { AuthStoreEffects } from "./auth-store/effects";
import { AcctStoreModule } from './acct-store';
import { ContextStoreModule } from './context-store';
import { FieldStoreModule } from './field-store';
import { IdeaStoreModule } from './idea-store';
import { TaskStoreModule } from './task-store';
import { ProjectStoreModule } from './project-store'

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		StoreModule.forRoot(reducers, {metaReducers}),
		EffectsModule.forRoot([AuthStoreEffects]), // [ ] TODO GB20190108224002: testing use of this auth store effects here to use $init effect.
		!environment.production ? StoreDevtoolsModule.instrument() : [],
		StoreRouterConnectingModule.forRoot({stateKey: 'router'}),
		AuthStoreModule,
		AcctStoreModule,
		ContextStoreModule,
		FieldStoreModule,
		IdeaStoreModule,
        TaskStoreModule,
        ProjectStoreModule,
	]
})
export class RootStoreModule {}
