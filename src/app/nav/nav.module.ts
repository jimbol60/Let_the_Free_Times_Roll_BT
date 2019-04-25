import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LeftSideNavComponent } from "./left-side-nav/left-side-nav.component";
import { RightSideNavComponent } from "./right-side-nav/right-side-nav.component";
import { MainNavComponent } from "./main-nav/main-nav.component";
import { AppMaterialModule } from "../common/modules/app-material.module";
import { GciCommonModule } from "../common/gci-common.module";
import { FieldNavComponent } from './field-nav/field-nav.component';

@NgModule({
	declarations: [
		LeftSideNavComponent,
		RightSideNavComponent,
		MainNavComponent,
		FieldNavComponent
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		AppMaterialModule,
		GciCommonModule,
	],
	exports: [
		LeftSideNavComponent,
		RightSideNavComponent,
		MainNavComponent,
        FieldNavComponent
	]
})
export class NavModule {}
