import { useEffect, useState } from 'react'
import './App.css'
import { useLocation } from 'react-router-dom'
import { Title } from "@mantine/core"
import { useNavigate } from 'react-router-dom'

import WindowBox from "../components/windowBox"

import ReturnToHomeScreenModal from "../components/ReturnToHomeScreenModal"

import WebSocket from '../components/WebSocket'
import { BUNNID_API_URL } from '../globals/api'
import { WsMessagePayload } from '../types/WsMessagePayload'
import WsMessage from '../objects/wsMesage'
import BoxModel from "../objects/BoxModel"


import { useGlobals } from '../context/globalsContext'
import ConversationSelectModel from "../objects/conversation/ConversationSelectModel"
import WsMessageType from '../objects/wsMessageType'


const App = () =>{
  const navigate = useNavigate()
  const location = useLocation()
  const initData = location.state;
  const [logout, setLogout] = useState(false)

  
  const [returnToHomeScreen, setReturnToHomeScreen] = useState(false)

  const [connectToRTS, setConnectToRTS] = useState(false)
  const [messageToSend, setMessageToSend] = useState<WsMessage>(new WsMessage(WsMessageType.NONE, true, ""))
  const [validAppSession, setValidAppSession] = useState(false)


  const [newBox, setNewBox] = useState<BoxModel>()
  const {UStoken, setRTStoken, RTStoken, user, spawnWindow, setWsMessageToSend} = useGlobals()

  useEffect(()=>{
    if (!UStoken) {
      setReturnToHomeScreen(true);
      return
    }
    
    // should get RTS and make websocket to connect
    setValidAppSession(true)

  },[UStoken])

  useEffect(()=>{
    if (!validAppSession) return;
    fetch(
        BUNNID_API_URL + "session/getRTS", 
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                token: UStoken
            })
        }
        
    ).then((response)=>{
     
        return response.json()
    }).then((data: WsMessagePayload)=>{

        if (!data.STATUS){
            console.log("Wrong status in getRTS")
            console.log(data.MSG)
            return

        }
        console.log(data.MSG)
        if (data.MSG?.token){
          setRTStoken(data.MSG.token)
        }
        else {
          console.log("No token found in rts call")
        }
    }).catch((reason)=>{
        console.log("ERROR IN WSRTS call")
        console.log(reason)
        
    })

    
  },[validAppSession])

  useEffect(()=>{
    if (!RTStoken) return;
    setConnectToRTS(true)
    console.log("Connecting to RTS")
  },[RTStoken])
  
  useEffect(()=>{
    if (!logout) return;

    navigate("/")
    // TODO remove tokenS from db
    
  },[logout])

  return (
    

      <div className="mainPage">
        {
          connectToRTS && <WebSocket />
        }
        {
          returnToHomeScreen && <ReturnToHomeScreenModal returnReason="not valid user session"/>
        }
        <div className='w-full h-full overflow-hidden'>
          <WindowBox />
        </div>
        
        <div className="box absolute left-0 bottom-1 w-full h-auto p-[5px] flex flex-row gap-5 z-1000">
            <Title order={1} className='text-[var(--accent)]'>Bunnid</Title>
            <div className="w-full h-full flex flex-row gap-10">
              <div className='w-full flex flex-row justify-end'>
                <button className='button !w-auto p-1'>
                  <Title order={2} className='text-[var(--info)]' onClick={()=>{
                    spawnWindow(new ConversationSelectModel(
                      {x: 0, y: 0},
                      user,
                      UStoken,
                      spawnWindow,
                      setWsMessageToSend
                      ))
                  }}>Chat</Title>
                </button>
              </div>
              
              <button className='button !w-auto p-1'>
                <Title order={2} className='text-[var(--danger)]' onClick={()=>setLogout(true)}>Logout</Title>
              </button>
              
            </div>
        </div>
        
        
      </div>
  
    
      
    
  )
}

export default App
