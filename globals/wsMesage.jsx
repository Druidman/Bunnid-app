class WsMessage {
    constructor(type, status, msg) {
        this.type = type; // WsMessageType
        this.status = status; // boolean
        this.msg = msg;
    }

    getMsgStringified() {
        return JSON.stringify(this.getMsg());
    }

    getMsg() {
        return {
            TYPE: this.type,
            STATUS: this.status,
            MSG: this.msg
        };
    }
}

export default WsMessage;