import {useEffect, useRef } from "react"
import useWebSocket from "react-use-websocket";
import { BUNNID_API_URL_WS } from '../globals/api'
import { 
    REQUEST_TOKEN_MSG, 
    REQUEST_TOKEN_MSG_REQ_TYPE,
    ACCESS_DENIED_MSG_INFO_TYPE,
    ACCESS_GRANTED_MSG_INFO_TYPE
 } from "../globals/api"

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

            if (msg.TYPE == REQUEST_TOKEN_MSG_REQ_TYPE && msg.STATUS){
                sendMessage(JSON.stringify(REQUEST_TOKEN_MSG(token)))
            }
            if (msg.TYPE == ACCESS_DENIED_MSG_INFO_TYPE && msg.STATUS){
                console.log("Acces denied :(")
            }
            if (msg.TYPE == ACCESS_GRANTED_MSG_INFO_TYPE && msg.STATUS){
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