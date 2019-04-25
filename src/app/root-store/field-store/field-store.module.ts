import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FieldStoreEffects } from './effects';
import { fieldReducer } from './reducer';
import { FIELDS_FEATURE_NAME } from "./state";

@NgModule({
	imports: [
		CommonModule,
		StoreModule.forFeature(FIELDS_FEATURE_NAME, fieldReducer),
		EffectsModule.forFeature([FieldStoreEffects])
	],
	providers: [FieldStoreEffects]
})
export class FieldStoreModule { }
