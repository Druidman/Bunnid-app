import { useEffect, useState } from 'react'
import Box from "../components/Box"
import './App.css'
import ErrorMsg from '../components/ErrorMsg'
import ChatWindow from '../components/ChatWindow'
import { useLocation } from 'react-router-dom'
import { Title } from "@mantine/core"
import { useNavigate } from 'react-router-dom'

import ReturnToHomeScreenModal from "../components/ReturnToHomeScreenModal"


const App = () =>{
  const navigate = useNavigate()
  const location = useLocation()
  const initData = location.state;
  const [logout, setLogout] = useState(false)

  const [windows, setWindows] = useState([])
  const [currentlyDraggedWindow, setCurrentlyDraggedWindow] = useState(null)
  const [returnToHomeScreen, setReturnToHomeScreen] = useState(false)
  
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

  const addWindow = () => {
    setWindows(prev => [...prev, 
      {
        id: Date.now(),
        content: {windowType: "ChatWindow", content: [
          {
            sender: "user",
            content: "Helo"
          },
          {
            sender: "other",
            content: "Siema"
          },
          {
            sender: "user",
            content: "Yoilo"
          },
          {
            sender: "other",
            content: "asda"
          }
        ]},
        position: {x: 100, y: 100},
        zIndex: 0
      }
    ])
  }
  const makeWindowContentFromData = (data) => {
    console.log(data.content)
    if (!data?.windowType) return <ErrorMsg data={"Unknown windowType"}/>
    if (data?.windowType == "ChatWindow"){
      return <ChatWindow initialData={data.content}></ChatWindow>
    }
    else{
      return data.data
    }
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
    if (!initData) setReturnToHomeScreen(true);

    if (!initData?.token){
      setReturnToHomeScreen(true)
    }
  },[initData])
  useEffect(()=>{
    if (!logout) return;

    navigate("/")
    // TODO remove token from db
    
  },[logout])
  return (
    
 
    <div className="mainPage">
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
          <div className="w-full h-full flex flex-row">
            <div className='w-full'>

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
