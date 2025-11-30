import { WsEvent } from "../objects/wsEvent"

export type WsMessagePayload<T> = {
    event: WsEvent,
    error: string,
    data: T,
    requestId: number
}


export type WsMessageRTMessagesInConversation = {
    conversationId: number
}