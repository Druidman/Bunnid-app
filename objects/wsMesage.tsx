import { WsMessagePayload } from "../types/WsMessagePayload"
import { WsEvent } from "./wsEvent";

class WsMessage<T> {
    
    error: string;
    event: WsEvent;
    requestId: number;
    data: T;
    msg: WsMessagePayload<T>

    constructor(msg: WsMessagePayload<T>) {
        this.event = msg.event
        this.error = msg.error
        this.requestId = msg.requestId
        this.data = msg.data
        this.msg = msg
        
    }

    getMsgStringified() {
        return JSON.stringify(this.msg);
    }
    

}



export default WsMessage;