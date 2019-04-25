import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';

import { GciCommonModule } from "../common/gci-common.module";
import { authRouting } from "./auth-routing.module";
import { AuthService } from "./auth.service";

import { UserRegisterComponent } from "./user-register/user-register.component";
import { UserLoginComponent } from "./user-login/user-login.component";
import { AuthenticateComponent } from './user-login/authenticate/authenticate.component';
import { AuthInterceptor } from "./auth.interceptor";
import { AuthGuard } from "./auth.guard";
import { TermsDialogComponent } from './terms-dialog/terms-dialog.component';

@NgModule({
	declarations: [
		UserRegisterComponent,
		UserLoginComponent,
		AuthenticateComponent,
		TermsDialogComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		GciCommonModule,
		ReactiveFormsModule,
		MatPasswordStrengthModule,
		authRouting,
	],
	exports: [
		AuthenticateComponent,
	],
	entryComponents: [
		TermsDialogComponent,
	],
	providers: [
		AuthService,
		{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
		AuthGuard
	]
})
export class AuthModule {
}
