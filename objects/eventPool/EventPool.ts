import { EventType } from "./EventType";
import { Event } from "./Event";
import { EventMap } from "./EventMap";
import { ConversationMsgEvent } from "./events/conversationMsg/Event";
import { NoneEvent } from "./events/noneEvent/Event";

export type EventInstance<T extends EventType> = Event<EventMap[T]['listener'], EventMap[T]['data']>

export class EventPool{
    events: {[K in EventType]: EventInstance<K> | null} = {
        [EventType.NEW_CONVERSATION_MSG]: new ConversationMsgEvent(),
        [EventType.NONE_EVENT]: new NoneEvent()
    }
    constructor(){}
        
    notify_event(eventType: EventType, additionalEventInfo=undefined): boolean {
        
        if (this.checkIfValidEventType(eventType)){
            return false;
        }
        this.events[eventType]?.notify(additionalEventInfo)

        return true
    }
    
    checkIfValidEventType(event_type: EventType) : boolean {
        return event_type in Object.keys(this.events)
          
    }

}