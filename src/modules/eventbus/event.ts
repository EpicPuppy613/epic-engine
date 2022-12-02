import { EventBus } from "./eventbus";
import { EventType } from "./eventtype";

export class Event<T extends EventType> {
    id: number;
    event: T;
    type: string;

    constructor (bus: EventBus, event: T, type: string) {
        this.id = bus.getNextId();
        this.event = event;
        this.type = type;
    }
}