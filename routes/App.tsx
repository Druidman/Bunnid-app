import { useEffect, useState } from 'react'
import { Title } from "@mantine/core"
import { useNavigate } from 'react-router-dom'

import WindowBox from "../components/windowBox"

import ReturnToHomeScreenModal from "../components/ReturnToHomeScreenModal"

import WebSocket from '../components/WebSocket'


import { useGlobals } from '../context/globalsContext'
import ConversationSelectModel from "../objects/conversation/ConversationSelectModel"
import { useDisclosure } from '@mantine/hooks'
import { Loading } from '../components/LoadingOverlay'

const App = () =>{
  const navigate = useNavigate()

  const [logout, setLogout] = useState(false)

  
  
  const [returnToHomeScreen, setReturnToHomeScreen] = useState(false)

  const [connectToRTS, setConnectToRTS] = useState(false)
  const [validAppSession, setValidAppSession] = useState(false)

  const {UStoken, user, spawnWindow, setWsMessageToSend} = useGlobals()

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
    setConnectToRTS(true)
    console.log("Connecting to RTS")
  },[validAppSession])
  
  useEffect(()=>{
    if (!logout) return;

    navigate("/app")
    // TODO remove tokenS from db
    
  },[logout])

  return (
    

      <div className="w-[100vw] h-[100vh] flex justify-center items-center flex-column bg-[var(--bg-dark)] overflow-hidden">

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
