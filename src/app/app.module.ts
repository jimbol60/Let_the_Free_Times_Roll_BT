import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import 'hammerjs';
import { QuillModule } from 'ngx-quill'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GciCommonModule } from "./common/gci-common.module";
import { AuthModule } from "./auth/auth.module";

import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterStateSerializer } from "@ngrx/router-store";
import { CustomSerializer } from "./root-store/util/ngrx-util";
import { RootStoreModule } from "./root-store/";
import { WrkModule } from './wrk/wrk.module';
import { NavModule } from './nav/nav.module';
import { DeasModule } from "./deas/deas.module";

@NgModule({
	declarations: [
		AppComponent,
		DashboardComponent,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		QuillModule.forRoot({
			placeholder: 'Enter details...',
			theme: 'snow',
			modules: {
				toolbar: {
					container: [
						[ 'bold', 'italic', 'underline' ],
						[ {'list': 'ordered'}, {'list': 'bullet'} ],
						[ {'indent': '-1'}, {'indent': '+1'} ],
						[ {'size': [ 'small', false, 'large', 'huge' ]} ],
						[ {'header': [ 1, 2, 3, 4, 5, 6, false ]} ],
						[ {'align': []} ]
					]
				}
			}
		}),
		GciCommonModule,
		AuthModule,
		MatPasswordStrengthModule.forRoot(),
		RootStoreModule,
		WrkModule,
		NavModule,
		DeasModule
	],
	providers: [
		{provide: RouterStateSerializer, useClass: CustomSerializer}
	],
	bootstrap: [ AppComponent ]
})
export class AppModule {
}
