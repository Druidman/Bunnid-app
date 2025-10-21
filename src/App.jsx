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
 
    <div className={`mainPage is-flex`}>
      
      <div>
        <button className="button is-primary" onClick={()=>addWindow()}>+</button>
      </div>
      <div>

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
      </div>
      <nav className="navbar is-fixed-bottom">
        <div className="navbar-brand">
            <div className="navbar-item has-text-primary title">
              Bunnid
            </div>
        </div>
        <div className="navbar-menu">
          <div className="navbar-start navbarLine is-flex ">
            <button className="navbar-item is-size-4 has-text-black button has-background-info">
              Chat
            </button>
            <button className="navbar-item is-size-4 has-text-black button has-background-info">
              Call
            </button>
            <button className="navbar-item is-size-4 has-text-black button has-background-info">
              Settings
            </button>
          </div>
          <div className="navbar-end">
            <button className="is-size-4 navbar-item has-background-danger has-text-white">
              Log out
            </button>
            
          </div>
        </div>

        
      </nav>
      
      
    </div>
      
    
  )
}

export default App
