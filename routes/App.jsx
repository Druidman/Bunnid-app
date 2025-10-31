import { useEffect, useState, useRef } from 'react'
import Box from "../components/Box"
import './App.css'
import ErrorMsg from '../components/ErrorMsg'
import ChatWindow from '../components/ChatWindow'
import { useLocation } from 'react-router-dom'
import { Title } from "@mantine/core"
import { useNavigate } from 'react-router-dom'

import ReturnToHomeScreenModal from "../components/ReturnToHomeScreenModal"

import WebSocket from '../components/WebSocket'
import { BUNNID_API_URL } from '../globals/api'



const makeWindow = (position, windowType, windowData, zIndex) => {
  return {
      id: Date.now(),
      content: {
        windowType: windowType, 
        content: windowData
      },
      position: position,
      zIndex: zIndex
    }
}

const App = () =>{
  const navigate = useNavigate()
  const location = useLocation()
  const initData = location.state;
  const [logout, setLogout] = useState(false)

  const [windows, setWindows] = useState([])
  const [currentlyDraggedWindow, setCurrentlyDraggedWindow] = useState(null)
  const [returnToHomeScreen, setReturnToHomeScreen] = useState(false)

  const [connectToRTS, setConnectToRTS] = useState(false)
  const [messageToSend, setMessageToSend] = useState("")
  const [validAppSession, setValidAppSession] = useState(false)

  const [wsRTSToken, setWsRTSToken] = useState("")
  

  
  
  const removeWindow = (id) => {
    setWindows(prev => prev.filter(item=> item.id !== id))
  }
  const handleWindowMove = (newPosition, id) => {
    setWindows(prev => prev.map((item)=>{
      if (item.id == id){
        item.position = newPosition
      }
      return item
    }))
    if (id != currentlyDraggedWindow){
      setCurrentlyDraggedWindow(id)
    }
    
  }

  const addWindow = (newWindow) => {
    setWindows(prev => [...prev, newWindow])
  }

  const makeWindowContentFromData = (data) => {
    if (!data?.windowType) return <ErrorMsg data={"Unknown windowType"}/>

    if (data?.windowType == "ChatWindow"){
      return <ChatWindow initialData={data.content}></ChatWindow>
    }
    else{
      return data.data
    }
  }

  const makeChatWindow = () => {
    let window = makeWindow(
      {x: 100, y: 100},
      "ChatWindow",
      [],
      0
    )
    addWindow(window)
  }

  useEffect(()=>{
    if (currentlyDraggedWindow == null) return

    setWindows(prev => prev.map((item)=>{
      if (item.id == currentlyDraggedWindow){
        item.zIndex = 1
        
      }
      else {
        item.zIndex = 0
      }
      return item
      
    }))

  }, [currentlyDraggedWindow])

  useEffect(()=>{
    if (!initData) {
      setReturnToHomeScreen(true);
      return
    }

    if (!initData?.token){
      setReturnToHomeScreen(true)
      return

    }
    setValidAppSession(true)
    
    
    // connect()
  },[initData])

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
                token: initData.token
            })
        }
        
    ).then((response)=>{
     
        return response.json()
    }).then((data)=>{

        if (!data.STATUS){
            console.log("Wrong status in getRTS")
            console.log(data.MSG)
            return

        }
        console.log(data.MSG)
        if (data.MSG?.token){
          setWsRTSToken(data.MSG.token)
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
    if (!wsRTSToken) return;
    setConnectToRTS(true)
    console.log("Connecting to rts")
  },[wsRTSToken])
  
  useEffect(()=>{
    if (!logout) return;

    navigate("/")
    // TODO remove token from db
    
  },[logout])

  return (
    
 
    <div className="mainPage">
      {
        connectToRTS && <WebSocket token={wsRTSToken} onNewMessage={(msg)=>{console.log("new msg: " + msg)}} messageToSend={messageToSend}/>
      }
      {
        returnToHomeScreen && <ReturnToHomeScreenModal returnReason="not valid user session"/>
      }
      
      <div className="w-full h-[90%] bg-inherit">

        {windows?.map((item)=>(
       
          <Box 
              key={item.id}
              onClose={()=>removeWindow(item.id)}
              onMove={(newPosition)=>handleWindowMove(newPosition, item.id)}
              startPosition={item.position}
              zIndex={item.zIndex}
          >{makeWindowContentFromData(item.content)}</Box>
          ))}
      </div >
      <div className="box absolute left-0 bottom-1 w-full h-auto p-[5px] flex flex-row gap-5 ">
          <Title order={1} className='text-[var(--accent)]'>Bunnid</Title>
          <div className="w-full h-full flex flex-row gap-10">
            <div className='w-full flex flex-row justify-end'>
              <button className='button !w-auto p-1'>
                <Title order={2} className='text-[var(--info)]' onClick={()=>makeChatWindow()}>Chat</Title>
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
