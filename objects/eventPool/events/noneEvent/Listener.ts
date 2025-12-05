import { EventListener } from "../../EventListener";
import { NoneEventData } from "./Data";

type CallbackType = ()=>void

export class NoneEventListener extends EventListener<CallbackType, NoneEventData>{
    
    constructor(callback: CallbackType){
        super(callback)
    }

    call(eventData: NoneEventData) : void{ }
}