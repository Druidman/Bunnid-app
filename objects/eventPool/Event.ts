import { EventType } from "./EventType"
import { EventListener } from "./EventListener"

export abstract class Event<TListener extends EventListener<any, TEventData>, TEventData>{
    
    protected listeners: TListener[] = []
    protected event_type: EventType = EventType.NONE_EVENT 

    constructor(event_type: EventType){
        this.event_type = event_type
    }

    getEventType() : EventType{ return this.event_type }
    getListeners() : TListener[] {return this.listeners}
        

    add_listener(listener: TListener): boolean {
        if (listener == undefined || listener == null){
            return false
        }
        
        this.listeners.push(listener)
        return true
    }

    remove_listener(listener: TListener) : boolean {
        if (listener == undefined || listener == null){
            // because this means that listener does not exist so removed right?
            return true 
        }
        
        this.listeners = this.listeners.filter((listenerItem) => listenerItem != listener)
        return true
    }


    notify(eventData?: TEventData) : void {
        return this.notify_listeners(eventData)
    }
    
    protected abstract notify_listeners(eventData?: TEventData) : void
}