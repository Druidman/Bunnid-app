import {useEffect, useRef } from "react"
import useWebSocket from "react-use-websocket";
import { BUNNID_API_URL_WS } from '../globals/api'
import WsMessageType from "../globals/wsMessageType"
import WsMessage from "../globals/wsMesage";

const  WebSocket = ({onNewMessage, messageToSend, token}) => {
    const wsRef = useRef(null);

    const { getWebSocket, readyState, sendMessage } = useWebSocket(BUNNID_API_URL_WS, {
        
        onOpen: () => {
            console.log('WebSocket connection established.');
            wsRef.current = getWebSocket();
        },
        onClose: () => {
            console.log('WebSocket connection closed.');
        },
        onMessage: (event) => {
            
            let msg = event.data

            msg = JSON.parse(msg)

            if (msg.TYPE == WsMessageType.REQUEST_TOKEN_MSG_TYPE && msg.STATUS){
                let msgToSend = new WsMessage(WsMessageType.RETURN_TOKEN_MSG_TYPE, true, "")
                sendMessage(msgToSend.getMsgStringified())
            }
            if (msg.TYPE == WsMessageType.ACCESS_DENIED_MSG_INFO_TYPE && msg.STATUS){
                console.log("Acces denied :(")
            }
            if (msg.TYPE == WsMessageType.ACCESS_GRANTED_MSG_INFO_TYPE && msg.STATUS){
                console.log("Acces granted :)")
            }


            onNewMessage(event.data)

        }
       
    });

    useEffect(()=>{
        if (!messageToSend) return;
        console.log("Sending msg: " + messageToSend)
        sendMessage(messageToSend)


    }, [messageToSend])
}

export default WebSocket;