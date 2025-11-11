import { Position } from "../types/position";

type BoxListener = ()=>void;
export default class BoxModel{
    id: number = -1;
    zIndex: number = 0;
    visible: boolean = true;
    position: Position;
    onClose: () => void = () => {};

    private listeners: BoxListener[] = []

    constructor(position: Position){
        this.id = Date.now()
        this.position = position
        this.notify()
    }
    
    onMove(newPosition: Position) : void{
        this.position = newPosition
        this.notify()
    }
    toggleVisible() : void{
        this.visible = !this.visible
        this.notify()
    }
    setToBack() : void{
        this.zIndex = 0
        this.notify()
    }
    setToFront() : void{
        this.zIndex = 1000
        this.notify()
    }

    makeContent() : React.ReactNode{
        throw new Error("Method `makeContent()` must be implemented")
    }

    subscribe(listener: BoxListener): ()=>void {
        this.listeners.push(listener)
        return () => {
            this.listeners.filter((l: BoxListener)=>{l !== listener})
        }
    }
    protected notify() : void{
        this.listeners.forEach((l: BoxListener) => { l() })
    }

}