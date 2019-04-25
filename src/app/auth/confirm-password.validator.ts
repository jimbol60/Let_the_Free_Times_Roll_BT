import { AbstractControl } from "@angular/forms";

export const ConfirmPasswordValidator = (control: AbstractControl): { [ key: string ]: boolean } => {
	const newPass = control.get('newPassword');
	const conPass = control.get('confirmPassword');
	
	// console.log("# ConfirmPasswordValidator");
	
	if (!newPass || !conPass) {
		// console.log("--ConfirmPasswordValidator: empty control");
		return null;
	}
	
	const confirmed = newPass.value === conPass.value ? null : {nomatch: true};
	
	// console.log("---- ConfirmPasswordValidator: " + JSON.stringify(confirmed));
	
	return confirmed;
};