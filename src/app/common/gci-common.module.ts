import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuillModule } from "ngx-quill";

import { AppMaterialModule } from "./modules/app-material.module";

import { TruncatePipe } from './pipes/truncate.pipe';

import { AlertLogService, AlertService, AlertLogComponent } from "./components/alert";
import { GciUtilService } from "./util/gci-util.service";
import { CharCounterComponent } from "./components/char-counter/char-counter.component";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { ErrorInterceptor } from "./data/error.interceptor";
import { DataService } from "./data/data.service";
import { UploadService } from "./data/upload.service";
import { ObjectTableComponent } from "./components/objects/object-table/object-table.component";
import { LoadingBarComponent } from './components/loading-bar/loading-bar.component';
import { ObjectDialogComponent } from "./components/objects/object-dialog/object-dialog.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EscapeHtmlPipe } from "./pipes/keep-html.pipe";

@NgModule({
	declarations: [
		TruncatePipe,
		CharCounterComponent,
		AlertLogComponent,
		ObjectTableComponent,
		LoadingBarComponent,
		ObjectDialogComponent,
		EscapeHtmlPipe,
	],
	imports: [
		CommonModule,
		QuillModule,
		FormsModule,
		ReactiveFormsModule,
		AppMaterialModule,
		HttpClientModule,
	],
	exports: [
		AppMaterialModule,
		TruncatePipe,
		CharCounterComponent,
		AlertLogComponent,
		ObjectTableComponent,
		LoadingBarComponent,
	],
	entryComponents: [
		ObjectDialogComponent,
	],
	providers: [
		DataService,
		UploadService,
		AlertService,
		AlertLogService,
		GciUtilService,
		{provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
	
	]
})
export class GciCommonModule {
}
