import { createContext, useContext, useState, useRef } from 'react';
import { User } from '../types/user';
import React from 'react';
import BoxModel from '../objects/BoxModel';
import WsMessage from '../objects/wsMesage';
import { WsEvent } from '../objects/wsEvent';
import { WsEventListenerType } from "../types/WsEventListenerType"
import { WsMessagePayload } from '../types/WsMessagePayload';
import {EventPool} from "../objects/eventPool/EventPool"

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
    eventPool: React.RefObject<EventPool | null>,
    wsMsgResponseWaiters: React.RefObject<{[key: number] : {callback: (response: WsMessagePayload<any>)=>void}}>


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
        eventPool: {current: null},
        wsMsgResponseWaiters: {current: {}},
        
    }
);

export const GlobalsContextProvider = ( {children} : {children: React.ReactNode}) => {
    const [user, setUser] = useState<User | null>(null)
    const [RTStoken, setRTStoken] = useState<string>("")
    const [UStoken, setUStoken] = useState<string>("")
    const [windowToSpawn, spawnWindow] = useState<BoxModel | null>(null)
    const [wsMessageToSend, setWsMessageToSend] = useState<WsMessage<any>>(new WsMessage<string>({event: WsEvent.NONE, error: "", data: "", requestId: 0}))
    const eventPool = useRef<EventPool | null>(new EventPool())

    const wsMsgResponseWaiters = useRef<
        {[key: number]: {callback: (response: WsMessagePayload<any>)=>{}}}
    >({})
    
    return (
        <GlobalsContext value={
            
            {
                user, setUser, 
                RTStoken, setRTStoken, 
                UStoken, setUStoken, 
                windowToSpawn, spawnWindow, 
                wsMessageToSend, setWsMessageToSend,
                eventPool,
                wsMsgResponseWaiters
            }
        }>
            {children}
        </GlobalsContext>
    )
}

export const useGlobals = () => useContext(GlobalsContext)
