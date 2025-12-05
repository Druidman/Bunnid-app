import { EventListener } from "../../EventListener";
import { ConversationMsgEventData } from "./Data";

type CallbackType = (data: ConversationMsgEventData)=>void

export class ConversationMsgEventListener extends EventListener<CallbackType, ConversationMsgEventData>{
    conversation_id?: number = undefined
    constructor(callback: CallbackType, conversation_id: number){
        super(callback)
        this.conversation_id = conversation_id
    }

    call(eventData: ConversationMsgEventData) : void{
        return this.listener_callback?.(eventData)
    }
}