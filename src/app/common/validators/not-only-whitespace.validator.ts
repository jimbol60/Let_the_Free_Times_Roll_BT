import { AbstractControl } from '@angular/forms';

/**
 * This validator will check for entries which contain whitespace only.
 * This does not check for null or empty entries, only for valid entries which only contain whitespace.
 * @param control AbstractControl
 * @constructor
 */
export function ValidateNotOnlyWhitespace(control: AbstractControl) {
	
	let isWhitespace: boolean;
	
	if(control.value) {
		
		// Check if control.value is a string before we try to trim
		if (typeof control.value === 'string' || control.value instanceof String) {
			const trimmedValue = control.value.trim();
			isWhitespace = trimmedValue.length === 0;
		} else {
			isWhitespace = false;
		}
		
	} else {
		isWhitespace = false;
	}
	
	const isValid = !isWhitespace;
	
	return isValid ? null : { 'whitespace': true };
}

