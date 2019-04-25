export class FieldModel {
	public UID?: string;
	public OwnAcctUID?: string;
	public Summary?: string;
	public Detail?: string;
	public CreatedAt?: string;
	
	constructor(obj: FieldModel = {} as FieldModel) {
		let {
			UID = "",
			OwnAcctUID = "",
			Summary = "",
			Detail = "",
			CreatedAt = "",
		} = obj;
		
		this.UID = UID;
		this.OwnAcctUID = OwnAcctUID;
		this.Summary = Summary;
		this.Detail = Detail;
		this.CreatedAt = CreatedAt;
	};
}