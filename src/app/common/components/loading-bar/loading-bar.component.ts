import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'gci-loading-bar',
  templateUrl: './loading-bar.component.html',
  styleUrls: ['./loading-bar.component.scss']
})
export class LoadingBarComponent implements OnInit {
	
	@Input() loadingMessage: string = "Loading";
	
	constructor() {}
	
	ngOnInit() {}

}
