import { Pipe, PipeTransform } from '@angular/core';

/*
    Modified from posts found here...
    https://stackoverflow.com/questions/44669340/how-to-truncate-text-in-angular2

    modification was to make it so that if string is shorter than limit, then don't shorten or add ellipsis.

 */

@Pipe({
	name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
	transform(value: string, limit = 60, completeWords = true, ellipsis = '...') {

		if (value) {
			if (value.length <= limit) {
				return value;
			} else {
				if (completeWords) {
					limit = value.substr(0, limit).lastIndexOf(' ');
				}

				return `${value.substr(0, limit)}${ellipsis}`;
			}
		} else {
			return value;
		}
	}
}