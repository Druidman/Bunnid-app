import { Event } from "../../Event";
import { ConversationMsgEventListener } from "./Listener";
import { ConversationMsgEventData } from "./Data";
import { EventType } from "../../EventType";

export class ConversationMsgEvent extends Event<ConversationMsgEventListener, ConversationMsgEventData>{
    constructor(){
        super(EventType.NEW_CONVERSATION_MSG)
    }

    protected notify_listeners(eventData?: ConversationMsgEventData | undefined): void {
        if (eventData == null){
            return // because in this event data is required
        }
        for (let listener of this.listeners){
            if (listener.conversation_id == eventData?.conversation_id){
                listener.call(eventData)
            }
        }
        

    }
}