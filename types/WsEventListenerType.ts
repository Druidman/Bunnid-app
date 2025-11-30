import { WsMessagePayload } from "./WsMessagePayload"
import { WsEvent } from "../objects/wsEvent"

export type WsEventListenerType<T> = {
    messageType: WsEvent
    callback: (msg: WsMessagePayload<T>) => void
}