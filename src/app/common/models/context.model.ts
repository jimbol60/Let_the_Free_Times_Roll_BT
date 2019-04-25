export class ContextModel {
	public acctUID?: string;
	public fieldUIDs?: string[];
	
	constructor(obj: ContextModel = {} as ContextModel) {
		let {
			acctUID = "",
			fieldUIDs = [],
		} = obj;
		
		this.acctUID = acctUID;
		this.fieldUIDs = fieldUIDs;
	};
}