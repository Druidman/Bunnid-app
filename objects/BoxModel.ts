import { Position } from "../types/position";


export default class Box{
    id: number = -1;
    zIndex: number = 0;
    visible: boolean = true;
    position: Position;
    onClose: () => void;

    constructor(position: Position, onClose: ()=>void){
        this.id = Date.now()
        this.position = position
        this.onClose = onClose
    }
    
    onMove(newPosition: Position) : void{
        this.position = newPosition
    }
    toggleVisible() : void{
        this.visible = !this.visible
    }
    setToBack() : void{
        this.zIndex = 0
    }
    setToFront() : void{
        this.zIndex = 1000
    }

    makeContent() : void{
        throw new Error("Method `makeContent()` must be implemented")
    }

}