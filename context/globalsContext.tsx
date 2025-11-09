import { createContext, useContext, useState } from 'react';
import { User } from '../types/user';
import React from 'react';


type GlobalsContextType = {
    user: User | null, 
    setUser: (nUser: User | null) => void,
    RTStoken: string, 
    setRTStoken: (token: string) => void,
    UStoken: string,
    setUStoken: (token: string) => void
}

export const GlobalsContext = createContext<GlobalsContextType>(
    {
        user: null, 
        setUser: ()=>{},
        RTStoken: "", 
        setRTStoken: ()=>{},
        UStoken: "",
        setUStoken: ()=>{},
    }
);

export const GlobalsContextProvider = ( {children} : {children: React.ReactNode}) => {
    const [user, setUser] = useState<User | null>(null)
    const [RTStoken, setRTStoken] = useState<string>("")
    const [UStoken, setUStoken] = useState<string>("")
    
    return (
        <GlobalsContext value={{user, setUser, RTStoken, setRTStoken, UStoken, setUStoken}}>
            {children}
        </GlobalsContext>
    )
}

export const useGlobals = () => useContext(GlobalsContext)
