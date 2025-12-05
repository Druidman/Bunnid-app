import {useEffect, useRef } from "react"
import useWebSocket from "react-use-websocket";
import { BUNNID_API_URL_WS } from '../globals/api'
import { WsEvent } from "../objects/wsEvent"
import { WsMessagePayload } from "../types/WsMessagePayload";
import { WebSocketLike } from "react-use-websocket/dist/lib/types";
import { useGlobals } from "../context/globalsContext";
import { convertWsEventToEventType, EventType } from "../objects/eventPool/EventType";

const WebSocket = () => {
    const wsRef = useRef<WebSocketLike>(null);
    const {RTStoken, wsMessageToSend, eventPool, wsMsgResponseWaiters} = useGlobals();

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
            console.log("MSG: " + msg)
            if (msg.requestId in wsMsgResponseWaiters.current){
                wsMsgResponseWaiters.current[msg.requestId].callback(msg)
            }
            else {
                if (!(msg.event in WsEvent)){
                    console.info("Some wierd msg came in thru ws...(Invalid event and no reqId)")
                    return 
                }
                let eventType: EventType | undefined = convertWsEventToEventType(msg.event)

                if (eventType == undefined){
                    return
                }

                eventPool.current?.events[eventType]?.notify(msg.data)

                    
                
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