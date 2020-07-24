export class Connection {
    public host: string;
    public port: number;
    public islazy: boolean;

    constructor() {
        this.host = "";
        this.port = 6379;
        this.islazy = true;
    }
}