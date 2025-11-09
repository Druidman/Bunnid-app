import { useState } from "react"
import { useResizeObserver } from '@mantine/hooks';
import {Position} from "../types/position"
import BoxModel from "../objects/BoxModel"



function Box({box, children} : {box: BoxModel, children?: React.ReactNode}) {
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [offset, setOffset] = useState<Position>({x:0, y:0});
    const [ref, rect] = useResizeObserver();

    return (
        
            <div 
                ref={ref}
                className={`flex justify-center items-center card h-[50%] w-[50%]`}
                onMouseDown={(e)=>{
                    if (e.target == e.currentTarget){return}
                    setIsDragging(true);
                    setOffset({
                        x: e.clientX - box.position.x,
                        y: e.clientY - box.position.y,
                    });
                }}
                onMouseUp={()=>setIsDragging(false)}
                onMouseLeave={()=>setIsDragging(false)}

                onMouseMove={(e)=>{
                    let x = e.clientX - offset.x
                    let y = e.clientY - offset.y
                    if (isDragging) {
                    box.onMove({x: x,y: y})
                    }
                }}
                style={{
                    left: box.position.x,
                    top: box.position.y,
                    zIndex: box.zIndex,
                    display: (box.visible) ? "block" : "none"

                }}
            > 
                <div className="w-[5%] h-[5%] absolute right-0 top-0">
                    <button onClick={box.onClose} className="text-[var(--text-muted)] w-full h-full hover:bg-[var(--bg-light)] rounded-full">x</button>
                </div>
                <div className="h-full w-full flex justify-center items-center p-[20px]">
                    {children}
                </div>
                
                
                
            </div>
   
        
        
        
    )
}

export default Box
