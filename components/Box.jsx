import { useState, useEffect } from "react"

import styles from './Box.module.css'

function Box({onClose, boxContent, onMove, startPosition, zIndex}) {
    const [position, setPosition] = useState({ x: null, y: null });
    const [isDragging, setIsDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    

    

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setOffset({
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        });
    }
    const handleMouseMove = (e) => {
        let x = e.clientX - offset.x
        let y = e.clientY - offset.y
        if (isDragging) {
          setPosition({
            x: x,
            y: y
          });
          onMove({x: x,y: y})
        }
        
    };
    const handleMouseUp = () => {
        setIsDragging(false);
    };
    useEffect(()=>{
        setPosition(startPosition)
    }, [startPosition])
    return (
        
        <div 
            className={`${styles.box} card`}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseUp}

            style={{
                left: (position.x == null) ? -1000 : position.x,
                top: (position.y == null) ? -1000 : position.y,
                zIndex: zIndex

            }}
        > 
            <button onClick={onClose} className="delete is-large"></button>
            {boxContent}
            
        </div>
        
        
    )
}

export default Box
