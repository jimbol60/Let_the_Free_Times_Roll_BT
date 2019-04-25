import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldsComponent } from './fields/fields.component';
import { GciCommonModule } from "../common/gci-common.module";
import { FieldService } from "./fields/field.service";

@NgModule({
	declarations: [
		FieldsComponent,
	],
	imports: [
		CommonModule,
		GciCommonModule,
	],
	providers: [
		FieldService,
	]
})
export class DeasModule {}
