import { useState } from "react"
import { useResizeObserver } from '@mantine/hooks';
import {Position} from "../types/position"
import BoxModel from "../objects/BoxModel"



function Box({box, children} : {box: BoxModel, children?: React.ReactNode}) {
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [offset, setOffset] = useState<Position>({x:0, y:0});
    const [update, setUpdate] = useState<boolean>(false);

    const clearListener = box.subscribe(()=>{
        setUpdate(!update)
    })

    return (
            <div 
                className={`flex justify-center items-center card h-[50%] w-[50%] `}
                onMouseDown={(e)=>{
             
                    setIsDragging(true);
                    setOffset({
                        x: e.clientX - box.position.x,
                        y: e.clientY - box.position.y,
                    });
                    box.setToFront()
                }}
                onMouseUp={()=>{setIsDragging(false); box.setToBack()}}
                onMouseLeave={()=>{setIsDragging(false); box.setToBack()}}

                onMouseMove={(e)=>{
                    let x = e.clientX - offset.x
                    let y = e.clientY - offset.y
  
                    if (isDragging) {
                        box.onMove({x: x,y: y})
                        console.log("MOVE")
                    }
                    
                    
                }}
                style={{
                    position: "absolute",
                    left: box.position.x,
                    top: box.position.y,
                    zIndex: box.zIndex,
                    display: (box.visible) ? "block" : "none"

                }}
            > 
                <div className="w-[5%] h-[5%] absolute right-0 top-0">
                    <button onClick={(e)=>{
                        box.onClose()
                        clearListener()

                    }} className="text-[var(--text-muted)] w-full h-full hover:bg-[var(--bg-light)] rounded-full">x</button>
                </div>
                <div className="h-full w-full flex justify-center items-center p-[20px]">
                    {children}
                </div>
                
                
                
            </div>
   
        
        
        
    )
}

export default Box
