
import {useState, useEffect} from 'react'
import BoxModel from "../objects/BoxModel"
import React from 'react'
import Box from "./Box"


//Why window


export default function WindowBox({ newBox } : {newBox?: BoxModel}){
    const [boxes, setBoxes] = useState<BoxModel[]>([])
    const [currentlyDraggedBoxId, setCurrentlyDraggedBoxId] = useState<number>(-1)


    const addBox = (boxToAdd: BoxModel) => {
        setBoxes(prev => [...prev, boxToAdd])
    }
    const removeBox = (boxToRemove: BoxModel) => {
        setBoxes(prev => prev.filter((box: BoxModel)=>box.id !== boxToRemove.id))
    }

    useEffect(()=>{
        if (!newBox) return;
        newBox.onClose = () => removeBox(newBox)
        addBox(newBox)
    },[newBox])

    useEffect(()=>{
        if (!currentlyDraggedBoxId) return;
        boxes.map((box: BoxModel)=>{
            if (box.id == currentlyDraggedBoxId){
                box.zIndex = 1
            }
            else {
                box.zIndex = 0
            }
        })
    },[currentlyDraggedBoxId])

    
    return (
        <div className="w-full h-full bg-inherit">

            {
                boxes?.map((box: BoxModel)=>(
        
                    <Box box={box}/>
                ))
            }
        </div >
    )
}