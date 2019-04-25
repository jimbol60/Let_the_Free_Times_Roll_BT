import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * https://medium.com/@AAlakkad/angular-2-display-html-without-sanitizing-filtering-17499024b079
 */
@Pipe({ name: 'keepHtml', pure: false })
export class EscapeHtmlPipe implements PipeTransform {
	constructor(private sanitizer: DomSanitizer) {
	}
	
	transform(content) {
		let html = content;
		if(html === undefined) {
            html = '';
		}
		return this.sanitizer.bypassSecurityTrustHtml(html);
	}
}