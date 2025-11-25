import { WsMessagePayload } from "./WsMessagePayload"
import WsMessageType from "../objects/wsMessageType"

export type WsEventListenerType = {
    messageType: WsMessageType
    callback: (msg: WsMessagePayload) => void
}