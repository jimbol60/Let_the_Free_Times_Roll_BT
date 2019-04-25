import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { acctReducer } from "./reducer";
import { AcctStoreEffects } from "./effects";
import { ACCTS_FEATURE_NAME } from "./state";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
	  StoreModule.forFeature(ACCTS_FEATURE_NAME, acctReducer),
	  EffectsModule.forFeature([AcctStoreEffects])
  ],
	providers: [AcctStoreEffects]
})
export class AcctStoreModule { }
