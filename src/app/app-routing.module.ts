import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserLoginComponent } from "./auth/user-login/user-login.component";
import { UserRegisterComponent } from "./auth/user-register/user-register.component";
import { AuthGuard } from "./auth/auth.guard";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { FieldsComponent } from "./deas/fields/fields.component";
import { IdeasComponent } from "./wrk/ideas/ideas.component";
import { TasksComponent } from './wrk/tasks/tasks.component';
import { ProjectsComponent } from './wrk/projects/projects.component';

const routes: Routes = [
	
	{path: '', component: DashboardComponent, canActivate: [ AuthGuard ]},
	
	{path: 'login', component: UserLoginComponent},
	{path: 'register', component: UserRegisterComponent},
	
	{path: 'dashboard', component: DashboardComponent, canActivate: [ AuthGuard ]},
	{path: 'deas/fields', component: FieldsComponent, canActivate: [ AuthGuard ]},
	{path: 'work/ideas', component: IdeasComponent, canActivate: [ AuthGuard ]},
	{path: 'work/tasks', component: TasksComponent, canActivate: [ AuthGuard ]},
	{path: 'work/projects', component: ProjectsComponent, canActivate: [ AuthGuard ]},
	
	// otherwise redirect to home
	{path: '**', redirectTo: 'dashboard'}
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {
}
