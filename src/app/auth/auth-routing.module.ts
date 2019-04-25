import { RouterModule, Routes } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { UserRegisterComponent } from "./user-register/user-register.component";


const authRoutes: Routes = [
	{
		path: 'auth',
		component: UserRegisterComponent,
	}
];

export const authRouting: ModuleWithProviders = RouterModule.forChild(authRoutes)