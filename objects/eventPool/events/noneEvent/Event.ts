import { Event } from "../../Event";
import { NoneEventListener } from "./Listener";
import { NoneEventData } from "./Data";
import { EventType } from "../../EventType";

export class NoneEvent extends Event<NoneEventListener, NoneEventData>{
    constructor(){
        super(EventType.NONE_EVENT)
    }
    protected notify_listeners(eventData?: NoneEventData | undefined): void {}
}