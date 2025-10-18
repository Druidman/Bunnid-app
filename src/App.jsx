import { useEffect, useState } from 'react'
import Box from "../components/Box"
import styles from './App.module.css'


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

  const addWindow = (e) => {
    setWindows(prev => [...prev, 
      {
        id: Date.now(),
        content: `Move me ${prev.length}`,
        position: {x: 100, y: 100},
        zIndex: 0
      }
    ])
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

  return (
 
    <div className={`${styles.mainPage} is-flex`}>
      <div>
        <button className="button is-primary" onClick={addWindow}>+</button>
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
      
      
    </div>
      
    
  )
}

export default App
