import { ConversationMessage } from "./message"

export type ApiRequestResult<T> = {
    response: T,
    error: string
}


export type SessionGetRtsResponse = {
    token?: string
}

export type LoginResponse = {
    token?: string,
    user_id?: number
}
export type RegisterResponse = {
    result?: boolean
}

export type ConversationCreateResponse = {
    result?: boolean
}

export type ConversationRequestModel = {
    
    title: string, 
    id: number
    
}
export type ConversationGetResponse = {
    conversation?: ConversationRequestModel
}

export type ConversationListResponse = {
    conversations?: ConversationRequestModel[]
}

export type ConversationGetMessagesResponse = {
    messages?: ConversationMessage[] 
}

export type ConversationSendMessageResoponse = {
    message_id?: number
}