export class AcctModel {
	public UID?: string;
	public TypeUID?: string;
	public Summary?: string;
	public Detail?: string;
	public CreatedAt?: string;
	
	constructor(obj: AcctModel = {} as AcctModel) {
		let {
			UID = "",
			TypeUID = "",
			Summary = "",
			Detail = "",
			CreatedAt = "",
		} = obj;
		
		this.UID = UID;
		this.TypeUID = TypeUID;
		this.Summary = Summary;
		this.Detail = Detail;
		this.CreatedAt = CreatedAt;
	};
}