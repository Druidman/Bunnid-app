import { WsEvent } from "../wsEvent";

export enum EventType {
    NONE_EVENT = 0,
    NEW_CONVERSATION_MSG = 1
}

const eventsMap: Partial<Record<WsEvent, EventType>> = {
    NEW_CONVERSATION_MSG__INFO: EventType.NEW_CONVERSATION_MSG,  
    INVALID_EVENT: EventType.NONE_EVENT
}

export function convertWsEventToEventType(wsEvent: WsEvent) : EventType | undefined{
    return eventsMap[wsEvent]
}