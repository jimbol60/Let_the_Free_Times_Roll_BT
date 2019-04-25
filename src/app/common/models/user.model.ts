
export class UserModel {
	public UID?: string;
	public FirstName?: string;
	public LastName?: string;
	public Email?: string;
	public CreatedAt?: string;
	
	constructor(obj: UserModel = {} as UserModel) {
		let {
			UID = "",
			FirstName = "",
			LastName = "",
			Email = "",
			CreatedAt = "",
		} = obj;
		
		this.UID = UID;
		this.FirstName = FirstName;
		this.LastName = LastName;
		this.Email = Email;
		this.CreatedAt = CreatedAt;
	};
}