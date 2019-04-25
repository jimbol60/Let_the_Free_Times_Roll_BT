import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {GciCommonModule} from "../common/gci-common.module";

import {IdeasComponent} from './ideas/ideas.component';
import {IdeaService} from "./ideas/idea.service";
import { TasksComponent } from './tasks/tasks.component';
import { TaskService } from './tasks/task.service';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectService } from './projects/project.service';

@NgModule({
    declarations: [ // Declare, but don't forget to also add to exports for use in other modules.
        IdeasComponent,
        TasksComponent,
        ProjectsComponent,
    ],
    entryComponents: [
    ],
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        GciCommonModule
    ],
    exports: [      // Declare, but don't forget to also add here for use in other modules.
        GciCommonModule,
        IdeasComponent,
        TasksComponent,
    ],
    providers: [
        IdeaService,
        TaskService,
        ProjectService
    ],
})
export class WrkModule {
}
