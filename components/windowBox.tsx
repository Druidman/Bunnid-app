
import {useState, useEffect} from 'react'
import BoxModel from "../objects/BoxModel"
import React from 'react'
import Box from "./Box"

import {useGlobals} from "../context/globalsContext"


//Why window


export default function WindowBox(){
    const [boxes, setBoxes] = useState<BoxModel[]>([])
    const { windowToSpawn } = useGlobals()

    const addBox = (boxToAdd: BoxModel) => {
        setBoxes(prev => [...prev, boxToAdd])
    }
    const removeBox = (boxToRemove: BoxModel) => {
        setBoxes(prev => prev.filter((box: BoxModel)=>box.id !== boxToRemove.id))
    }
    const genBox = (box: BoxModel) => {
        box.onClose = () => removeBox(box)
        box.addNewBox = genBox
        addBox(box)
    }

    useEffect(()=>{
        if (!windowToSpawn) return;
        genBox(windowToSpawn)
        
    },[windowToSpawn])

    
    return (
        <div 
            className="w-full h-full bg-inherit overflow-hidden relative"
        >

            {
                boxes?.map((box: BoxModel, index: number)=>(
        
                    <Box box={box} key={index} />
                ))
            }
        </div >
    )
}