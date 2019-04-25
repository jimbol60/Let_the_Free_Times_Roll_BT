import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
	selector: 'gci-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: [ './dashboard.component.scss' ]
})
export class DashboardComponent implements OnInit {
	
	constructor(private router: Router,) { }
	
	ngOnInit() {
	}
	
	public goToFields() {
		this.router.navigate(['deas','fields']);
	}
	
	public goToIdeas() {
		this.router.navigate(['work','ideas']);
	}
}
