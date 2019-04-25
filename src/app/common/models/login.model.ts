export class LoginModel {
	public UID?: string;
	public UserUID?: string;
	public Username?: string;
	public PasswordHash?: string;
	public CreatedAt?: string;
	
	constructor(obj: LoginModel = {} as LoginModel) {
		let {
			UID = "",
			UserUID = "",
			Username = "",
			PasswordHash = "",
			CreatedAt = "",
		} = obj;
		
		this.UID = UID;
		this.UserUID = UserUID;
		this.Username = Username;
		this.PasswordHash = PasswordHash;
		this.CreatedAt = CreatedAt;
	};
}