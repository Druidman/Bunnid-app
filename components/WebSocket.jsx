import {useEffect, useRef } from "react"
import useWebSocket from "react-use-websocket";
import { BUNNID_API_URL_WS } from '../globals/api'

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