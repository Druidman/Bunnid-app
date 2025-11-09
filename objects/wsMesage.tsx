import { WsMessagePayload } from "../types/WsMessagePayload"

class WsMessage {
    type: string; 
    status: boolean;
    msg: string;

    constructor(type: string, status: boolean, msg: string) {
        this.type = type;
        this.status = status;
        this.msg = msg;
    }

    getMsgStringified() {
        return JSON.stringify(this.getMsg());
    }

    getMsg() : WsMessagePayload {
        return {
            TYPE: this.type,
            STATUS: this.status,
            MSG: this.msg
        };
    }
}

export default WsMessage;