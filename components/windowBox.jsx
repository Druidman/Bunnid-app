
import {useState, useEffect} from 'react'


const makeWindow = (position, windowType, windowData, zIndex) => {
    return {
        id: Date.now(),
        content: {
          windowType: windowType, 
          content: windowData
        },
        position: position,
        zIndex: zIndex,
        visible: true
      }
}

export default function WindowBox({ newWindow }){
    const [windows, setWindows] = useState([])
    const [currentlyDraggedWindow, setCurrentlyDraggedWindow] = useState(null)


    const addWindow = (windowToAdd) => {
        setWindows(prev => [...prev, windowToAdd])
    }
    const removeWindow = (windowToRemove) => {
        setWindows(prev => prev.map((item)=>{
            if (windowToRemove == item) return;
            return item
        }))
    }

    useEffect(()=>{
        if (!newWindow) return;
        addWindow(newWindow)
    },[newWindow])

    useEffect(()=>{
        if (!currentlyDraggedWindow) return;
        windows.map((window)=>{
            if (window.id == currentlyDraggedWindow){
                window.zIndex = 1
            }
            else {
                window.zIndex = 0
            }
        })
    },[currentlyDraggedWindow])

    
    return (
        <div className="w-full h-full bg-inherit">

        {windows?.map((box)=>(
       
          <Box 
            key={box.id}
            onClose={()=>removeWindow(box)}
            onMove={(newPosition)=>{
                setCurrentlyDraggedWindow(box.id)
                box.onMove(newPosition)
            }}
            startPosition={box.position}
            zIndex={box.zIndex}
            visible={box.visible}
          >{box.makeContent()}</Box>
          ))}
      </div >
    )
}