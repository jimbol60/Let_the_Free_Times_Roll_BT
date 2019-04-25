import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ideaStoreEffects } from './effects';
import { ideaReducer } from './reducer';
import { IDEA_FEATURE_NAME } from "./state";

@NgModule({
	imports: [
		CommonModule,
		StoreModule.forFeature(IDEA_FEATURE_NAME, ideaReducer),
		EffectsModule.forFeature([ideaStoreEffects])
	],
	providers: [ideaStoreEffects]
})
export class IdeaStoreModule { }
