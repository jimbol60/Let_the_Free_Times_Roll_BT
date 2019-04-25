export class IdeaModel {

    public UID?: string;
    public OwnerAcctUID?: string;
    public VersionUID?: string;
    public Summary?: string;
    public Detail?: string;
    public IsActive?: boolean;
    public Order?: number;
    public CreatedAt?: string;

    constructor(obj: IdeaModel = {} as IdeaModel) {

        let {
            UID = "",
            OwnerAcctUID = "",
            VersionUID = "",
            Summary = "",
            Detail = "",
            IsActive = true,
            Order = -1,
			CreatedAt = "",
        } = obj;


        this.UID = UID;
        this.OwnerAcctUID = OwnerAcctUID;
        this.VersionUID = VersionUID;
        this.Summary = Summary;
        this.Detail = Detail;
        this.IsActive = IsActive;
        this.Order = Order;
        this.CreatedAt = CreatedAt;
    }
}
