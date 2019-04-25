import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthStoreEffects } from './effects';
import { authReducer } from './reducer';
import { AUTH_FEATURE_NAME } from "./state";

@NgModule({
	imports: [
		CommonModule,
		StoreModule.forFeature(AUTH_FEATURE_NAME, authReducer),
		EffectsModule.forFeature([AuthStoreEffects])
	],
	providers: [AuthStoreEffects]
})
export class AuthStoreModule { }
