import { EventBus } from "./eventbus.js";
import { EventType } from "./eventtype.js";

export class EventHandler<T extends EventType> {
    id: number;
    type: string;
    handle: (event: T) => void;

    constructor (bus: EventBus, type: string, handler: (event: T) => void) {
        this.id = bus.getNextId();
        this.type = type;
        this.handle = handler;
    }
}