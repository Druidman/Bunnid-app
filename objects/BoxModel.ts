import { Position } from "../types/position";


export default class BoxModel{
    id: number = -1;
    zIndex: number = 0;
    visible: boolean = true;
    position: Position;
    onClose: () => void = () => {};

    constructor(position: Position){
        this.id = Date.now()
        this.position = position
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

    makeContent() : React.ReactNode{
        throw new Error("Method `makeContent()` must be implemented")
    }

}