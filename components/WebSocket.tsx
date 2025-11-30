import {useEffect, useRef } from "react"
import useWebSocket from "react-use-websocket";
import { BUNNID_API_URL_WS } from '../globals/api'
import { WsEvent } from "../objects/wsEvent"
import { WsMessagePayload } from "../types/WsMessagePayload";
import { WebSocketLike } from "react-use-websocket/dist/lib/types";
import { useGlobals } from "../context/globalsContext";

const WebSocket = () => {
    const wsRef = useRef<WebSocketLike>(null);
    const {RTStoken, wsMessageToSend, wsEventListeners} = useGlobals();

    const { getWebSocket, sendMessage } = useWebSocket(BUNNID_API_URL_WS + RTStoken, {
        
        onOpen: () => {
            console.log('WebSocket connection established.');
            wsRef.current = getWebSocket();
        },
        onClose: () => {
            console.log('WebSocket connection closed.');
        },
        onMessage: (event) => {
            
       

            let msg: WsMessagePayload<any> = JSON.parse(event.data)


            if (msg.error in wsEventListeners.current){
                wsEventListeners.current[msg.event].callback(msg)
                return
            }

        }
       
    });

    useEffect(()=>{
        if (!wsMessageToSend) return;
        if (wsMessageToSend.event == WsEvent.NONE) return;

        console.log("Sending msg: " + wsMessageToSend.msg)
        sendMessage(wsMessageToSend.getMsgStringified())


    }, [wsMessageToSend])
    return (<></>)
}

export default WebSocket;