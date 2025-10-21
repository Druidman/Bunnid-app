import { useEffect, useState } from 'react'
import Box from "../components/Box"
import './App.css'
import ErrorMsg from '../components/ErrorMsg'


function App() {
  const [windows, setWindows] = useState([])
  const [currentlyDraggedWindow, setCurrentlyDraggedWindow] = useState(null)
  
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
        content: `Window`,
        position: {x: 100, y: 100},
        zIndex: 0
      }
    ])
  }
  // const makeWindowContentFromData = (data) => {
  //   if (!data?.windowType) return <ErrorMsg/>
  //   if (data.windowType == "ChatWindow"){
  //     return <ChatWindow></ChatWindow>
  //   }
  // }

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

  return (
 
    <div className="mainPage">
      <div className="w-[10%] h-[5%]">
        <button className="button" onClick={()=>addWindow()}>+</button>
      </div>
      <div className="w-full h-[90%] bg-inherit">

        {windows?.map((item)=>(
       
          <Box 
              key={item.id}
              onClose={()=>removeWindow(item.id)}
              boxContent={<h1 className="title has-text-warning">{item.content}</h1>}
              onMove={(newPosition)=>handleWindowMove(newPosition, item.id)}
              startPosition={item.position}
              zIndex={item.zIndex}
          />
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
          <button className="!text-[var(--text-muted)] hover:!bg-[var(--danger)] hover:!text-[var(--text-dark)] button  px-4 py-2">
            Log out
          </button>
        </div>
      </nav>
      
      
    </div>
      
    
  )
}

export default App
