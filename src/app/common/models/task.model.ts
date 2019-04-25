export class TaskModel {

    public UID?: string;
    public OwnerAcctUID?: string;
    public VersionUID?: string;
    public SetupUID?: string;
    public PathUID?: string;
    public Summary?: string;
    public Detail?: string;
    public IsActive?: boolean;
    public Order?: number;
    public CreatedAt?: string;
    
    constructor(obj: TaskModel = {} as TaskModel) {

        let {
            UID = "",
            OwnerAcctUID = "",
            VersionUID = "",
            SetupUID = "",
            PathUID = "",
            Summary = "",
            Detail = "",
            IsActive = true,
            Order = -1,
			CreatedAt = "",
        } = obj;


        this.UID = UID;
        this.OwnerAcctUID = OwnerAcctUID;
        this.VersionUID = VersionUID;
        this.SetupUID = SetupUID;
        this.PathUID = PathUID;
        this.Summary = Summary;
        this.Detail = Detail;
        this.IsActive = IsActive;
        this.Order = Order;
        this.CreatedAt = CreatedAt;
    }
}
