import { createContext, useContext, useState, useRef } from 'react';
import { User } from '../types/user';
import React from 'react';
import BoxModel from '../objects/BoxModel';
import WsMessage from '../objects/wsMesage';
import { WsEvent } from '../objects/wsEvent';
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
    wsMessageToSend: WsMessage<any>,
    setWsMessageToSend: (msg: WsMessage<any>)=>void,
    wsEventListeners: React.RefObject<{[id: string] : WsEventListenerType<any>}>


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
        wsMessageToSend: new WsMessage<string>({event: WsEvent.NONE, error: "", data: "", requestId: 0}),
        setWsMessageToSend: ()=>{},
        wsEventListeners: {current: {}}
        
    }
);

export const GlobalsContextProvider = ( {children} : {children: React.ReactNode}) => {
    const [user, setUser] = useState<User | null>(null)
    const [RTStoken, setRTStoken] = useState<string>("")
    const [UStoken, setUStoken] = useState<string>("")
    const [windowToSpawn, spawnWindow] = useState<BoxModel | null>(null)
    const [wsMessageToSend, setWsMessageToSend] = useState<WsMessage<any>>(new WsMessage<string>({event: WsEvent.NONE, error: "", data: "", requestId: 0}))
    const wsEventListeners = useRef<
        Partial<Record<WsEvent, WsEventListenerType<any> > > 
    >({})
    
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
