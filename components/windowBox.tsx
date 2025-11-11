
import {useState, useEffect} from 'react'
import BoxModel from "../objects/BoxModel"
import React from 'react'
import Box from "./Box"


//Why window


export default function WindowBox({ newBox } : {newBox?: BoxModel}){
    const [boxes, setBoxes] = useState<BoxModel[]>([])

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

    
    return (
        <div className="w-full h-full bg-inherit overflow-hidden relative">

            {
                boxes?.map((box: BoxModel)=>(
        
                    <Box box={box} key={box.id} />
                ))
            }
        </div >
    )
}