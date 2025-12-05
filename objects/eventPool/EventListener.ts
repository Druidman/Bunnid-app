export abstract class EventListener<TCallback, TEventData>{
    listener_callback?: TCallback = undefined
    
    constructor(callback: TCallback) {
        this.listener_callback = callback
    }   
    
    abstract call(eventData: TEventData) : void
}