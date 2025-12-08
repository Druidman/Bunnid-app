import { ConversationMessage } from "./message"

export type ApiRequestResult<T> = {
    response: T,
    error: string
}

export type UserSessionTokenResponse = {
    session_token?: string,
    result?: boolean
}

export type LoginResponse = {
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

export type ConversationSendMessageResponse = {
    message_id?: number
}