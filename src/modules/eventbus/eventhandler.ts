import { EventBus } from "./eventbus";
import { EventType } from "./eventtype";

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