export default class WsMessageType {
    static TOKEN__REQ: string = "TOKEN_REQ"
    static TOKEN__RES: string = "TOKEN_RES"
    static ACCESS_GRANTED__INFO: string = "ACCESS_GRANTED_INFO"
    static ACCESS_DENIED__INFO: string = "ACCESS_DENIED_INFO"
    static RT_MESSAGES_IN_CONVERSATION__REQ: string = "RT_MESSAGES_IN_CONVERSATION_REQ"
    static RT_MESSAGES_IN_CONVERSATION__RES: string = "RT_MESSAGES_IN_CONVERSATION_RES"
    static NEW_CONVERSATION_MSG__DATA: string = "NEW_CONVERSATION_MSG_DATA"
    static NONE: string = "NONE"
    static requests: Array<string> = [WsMessageType.RT_MESSAGES_IN_CONVERSATION__REQ, WsMessageType.TOKEN__REQ]
    
}

