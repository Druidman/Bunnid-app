export default class Box{
    constructor(zIndex, visible, position){
        this.id = Date.now()
        this.zIndex = zIndex
        this.visible = visible
        this.position = position
        this.content = null
    }

    onMove(newPosition){
        this.position = newPosition
    }
    toggleVisible(){
        this.visible = !this.visible
    }
    setToBack(){
        this.zIndex = 0
    }
    setToFront(){
        this.zIndex = 1000
    }


    makeContent(){
        throw new Error("Method `makeContent()` must be implemented")
    }

}