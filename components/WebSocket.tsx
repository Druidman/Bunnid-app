import {useEffect, useRef } from "react"
import useWebSocket from "react-use-websocket";
import { BUNNID_API_URL_WS } from '../globals/api'
import WsMessageType from "../objects/wsMessageType"
import WsMessage from "../objects/wsMesage";
import { WsMessagePayload } from "../types/WsMessagePayload";
import { WebSocketLike } from "react-use-websocket/dist/lib/types";
import { useGlobals } from "../context/globalsContext";

const  WebSocket = () => {
    const wsRef = useRef<WebSocketLike>(null);
    const {RTStoken, wsMessageToSend, wsEventListeners} = useGlobals();

    const { getWebSocket, sendMessage } = useWebSocket(BUNNID_API_URL_WS, {
        
        onOpen: () => {
            console.log('WebSocket connection established.');
            wsRef.current = getWebSocket();
        },
        onClose: () => {
            console.log('WebSocket connection closed.');
        },
        onMessage: (event) => {
            
       

            let msg: WsMessagePayload = JSON.parse(event.data)

            if (msg.TYPE == WsMessageType.TOKEN__REQ && msg.STATUS){
                let msgToSend: WsMessage = new WsMessage(WsMessageType.TOKEN__RES, true, RTStoken)
                sendMessage(msgToSend.getMsgStringified())
                return
            }
            if (msg.TYPE == WsMessageType.ACCESS_DENIED__INFO && msg.STATUS){
                console.log("Acces denied :(")
                return
            }
            if (msg.TYPE == WsMessageType.ACCESS_GRANTED__INFO && msg.STATUS){
                console.log("Acces granted :)")
                return
            }

            if (msg.TYPE in wsEventListeners.current){
                wsEventListeners.current[msg.TYPE].callback(msg)
                return
            }

        }
       
    });

    useEffect(()=>{
        if (!wsMessageToSend) return;
        if (wsMessageToSend.type == WsMessageType.NONE) return;

        console.log("Sending msg: " + wsMessageToSend.getMsg())
        sendMessage(wsMessageToSend.getMsgStringified())


    }, [wsMessageToSend])
    return (<></>)
}

export default WebSocket;