import { createContext, useContext, useState, useRef } from 'react';
import { User } from '../types/user';
import React from 'react';
import BoxModel from '../objects/BoxModel';
import WsMessage from '../objects/wsMesage';
import WsMessageType from '../objects/wsMessageType';
import { WsEventListenerType } from "../types/WsEventListenerType"
import { WsMessagePayload } from '../types/WsMessagePayload';


type GlobalsContextType = {
    user: User | null, 
    setUser: (nUser: User | null) => void,
    RTStoken: string, 
    setRTStoken: (token: string) => void,
    UStoken: string,
    setUStoken: (token: string) => void,
    windowToSpawn: BoxModel | null,
    spawnWindow: (window: BoxModel | null)=>void,
    wsMessageToSend: WsMessage,
    setWsMessageToSend: (msg: WsMessage)=>void,
    wsEventListeners: React.RefObject<{[id: string] : WsEventListenerType}>


}

export const GlobalsContext = createContext<GlobalsContextType>(
    {
        user: null, 
        setUser: ()=>{},
        RTStoken: "", 
        setRTStoken: ()=>{},
        UStoken: "",
        setUStoken: ()=>{},
        windowToSpawn: null,
        spawnWindow: ()=>{},
        wsMessageToSend: new WsMessage(WsMessageType.NONE, true, ""),
        setWsMessageToSend: ()=>{},
        wsEventListeners: {current: {}}
        
    }
);

export const GlobalsContextProvider = ( {children} : {children: React.ReactNode}) => {
    const [user, setUser] = useState<User | null>(null)
    const [RTStoken, setRTStoken] = useState<string>("")
    const [UStoken, setUStoken] = useState<string>("")
    const [windowToSpawn, spawnWindow] = useState<BoxModel | null>(null)
    const [wsMessageToSend, setWsMessageToSend] = useState<WsMessage>(new WsMessage(WsMessageType.NONE, true, ""))
    const wsEventListeners = useRef<{[id: string] : WsEventListenerType}>({})
    
    return (
        <GlobalsContext value={
            
            {
                user, setUser, 
                RTStoken, setRTStoken, 
                UStoken, setUStoken, 
                windowToSpawn, spawnWindow, 
                wsMessageToSend, setWsMessageToSend,
                wsEventListeners
            }
        }>
            {children}
        </GlobalsContext>
    )
}

export const useGlobals = () => useContext(GlobalsContext)
