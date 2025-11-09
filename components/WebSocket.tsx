import {useEffect, useRef } from "react"
import useWebSocket from "react-use-websocket";
import { BUNNID_API_URL_WS } from '../globals/api'
import WsMessageType from "../objects/wsMessageType"
import WsMessage from "../objects/wsMesage";
import { WsMessagePayload } from "../types/WsMessagePayload";
import { WebSocketHook, WebSocketLike } from "react-use-websocket/dist/lib/types";


type WebSocketParams = {
    onNewMessage: (msg: WsMessagePayload)=>void;
    messageToSend: WsMessage; 
    token: string;
}

const  WebSocket = ( {onNewMessage, messageToSend, token} : WebSocketParams) => {
    const wsRef = useRef<WebSocketLike>(null);

    const { getWebSocket, readyState, sendMessage } = useWebSocket(BUNNID_API_URL_WS, {
        
        onOpen: () => {
            console.log('WebSocket connection established.');
            wsRef.current = getWebSocket();
        },
        onClose: () => {
            console.log('WebSocket connection closed.');
        },
        onMessage: (event) => {
            
       

            let msg: WsMessagePayload = JSON.parse(event.data)

            if (msg.TYPE == WsMessageType.REQUEST_TOKEN_MSG_TYPE && msg.STATUS){
                let msgToSend: WsMessage = new WsMessage(WsMessageType.RETURN_TOKEN_MSG_TYPE, true, token)
                sendMessage(msgToSend.getMsgStringified())
            }
            if (msg.TYPE == WsMessageType.ACCESS_DENIED_MSG_INFO_TYPE && msg.STATUS){
                console.log("Acces denied :(")
            }
            if (msg.TYPE == WsMessageType.ACCESS_GRANTED_MSG_INFO_TYPE && msg.STATUS){
                console.log("Acces granted :)")
            }


            onNewMessage(msg)

        }
       
    });

    useEffect(()=>{
        if (!messageToSend) return;
        console.log("Sending msg: " + messageToSend.getMsg())
        sendMessage(messageToSend.getMsgStringified())


    }, [messageToSend])
}

export default WebSocket;