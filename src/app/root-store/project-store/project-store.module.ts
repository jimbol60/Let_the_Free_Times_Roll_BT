import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { PROJECT_FEATURE_NAME } from './state';
import { projReducer } from './reducer';
import { projStoreEffects } from './effects';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        StoreModule.forFeature(PROJECT_FEATURE_NAME, projReducer),
        EffectsModule.forFeature([ projStoreEffects ])
    ]
})
export class ProjectStoreModule {}
