import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ContextStoreEffects } from './effects';
import { contextReducer } from './reducer';
import { CONTEXT_FEATURE_NAME } from "./state";

@NgModule({
	imports: [
		CommonModule,
		StoreModule.forFeature(CONTEXT_FEATURE_NAME, contextReducer),
		EffectsModule.forFeature([ContextStoreEffects])
	],
	providers: [ContextStoreEffects]
})
export class ContextStoreModule { }
