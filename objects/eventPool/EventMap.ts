import { EventType } from "./EventType"
import { ConversationMsgEventData } from "./events/conversationMsg/Data"

import { NoneEventData } from "./events/noneEvent/Data"
import { ConversationMsgEventListener } from "./events/conversationMsg/Listener"
import { NoneEventListener } from "./events/noneEvent/Listener"

export interface EventMap {
    [EventType.NEW_CONVERSATION_MSG]: {
        listener: ConversationMsgEventListener,
        data: ConversationMsgEventData
    },
    [EventType.NONE_EVENT]: {
        listener: NoneEventListener,
        data: NoneEventData
    }
}