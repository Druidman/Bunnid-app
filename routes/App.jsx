import { useEffect, useState } from 'react'
import Box from "../components/Box"
import './App.css'
import ErrorMsg from '../components/ErrorMsg'
import ChatWindow from '../components/ChatWindow'
import { useLocation } from 'react-router-dom'

import ReturnToHomeScreenModal from "../components/ReturnToHomeScreenModal"


const App = () =>{
  
  const location = useLocation()
  const initData = location.state;

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
    if (!initData) return;

    if (!initData?.token){
      setReturnToHomeScreen(true)
    }
  },[initData])
  return (
    
 
    <div className="mainPage">
      {
        returnToHomeScreen && <ReturnToHomeScreenModal returnReason="not valid user session"/>
      }
      <div className="w-[10%] h-[5%]">
        <button className="button" onClick={()=>addWindow()}>+</button>
      </div>
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
      <nav className="w-full h-[5%] bg-inherit flex items-center justify-between px-6 py-2">
        {/* Brand */}
        <div className="text-[var(--text)] text-2xl font-bold">
          Bunnid
        </div>

        {/* Menu */}
        <div className="flex items-center space-x-4">
          {/* Left buttons */}
          <div className="flex space-x-2 ">
            <button className="button px-4 py-2 ">
              Chat
            </button>
            <button className="button px-4 py-2">
              Call
            </button>
            <button className="button px-4 py-2">
              Settings
            </button>
          </div>
        </div>
        <div>
          {/* Right button */}
          <button className="!text-[var(--text-dark)] hover:!bg-[var(--danger-hover)] !bg-[var(--danger)] button  px-4 py-2">
            Log out
          </button>
        </div>
      </nav>
      
      
    </div>
      
    
  )
}

export default App
