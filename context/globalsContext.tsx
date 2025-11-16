import { createContext, useContext, useState } from 'react';
import { User } from '../types/user';
import React from 'react';
import BoxModel from '../objects/BoxModel';


type GlobalsContextType = {
    user: User | null, 
    setUser: (nUser: User | null) => void,
    RTStoken: string, 
    setRTStoken: (token: string) => void,
    UStoken: string,
    setUStoken: (token: string) => void,
    windowToSpawn: BoxModel | null,
    spawnWindow: (window: BoxModel | null)=>void
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
        spawnWindow: ()=>{}
    }
);

export const GlobalsContextProvider = ( {children} : {children: React.ReactNode}) => {
    const [user, setUser] = useState<User | null>(null)
    const [RTStoken, setRTStoken] = useState<string>("")
    const [UStoken, setUStoken] = useState<string>("")
    const [windowToSpawn, spawnWindow] = useState<BoxModel | null>(null)
    
    return (
        <GlobalsContext value={{user, setUser, RTStoken, setRTStoken, UStoken, setUStoken, windowToSpawn, spawnWindow}}>
            {children}
        </GlobalsContext>
    )
}

export const useGlobals = () => useContext(GlobalsContext)
