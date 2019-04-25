import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TASK_FEATURE_NAME } from './state';
import { taskReducer } from './reducer';
import { taskStoreEffects } from './effects';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature(TASK_FEATURE_NAME, taskReducer),
        EffectsModule.forFeature([ taskStoreEffects ])
    ],
    providers: []
})
export class TaskStoreModule {}
