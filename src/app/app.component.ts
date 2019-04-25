import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'gci-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit {
	
	public isLoading = true;
	
	public quickFieldsIsOpen = false;
    
	constructor() {}
	
	ngOnInit() {}
    
    public onToggleQuickFields() {
        this.quickFieldsIsOpen = !this.quickFieldsIsOpen;
	}
}
