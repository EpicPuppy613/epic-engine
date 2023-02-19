import { EventBus } from "./eventbus.js";
import { EventType } from "./eventtype.js";

export class GameEvent<T extends EventType> {
    id: number;
    event: T;
    type: string;

    constructor (bus: EventBus, event: T, type: string) {
        this.id = bus.getNextId();
        this.event = event;
        this.type = type;
    }

    send (eventBus: EventBus): void {
        eventBus.sendEvent(this.id);
    }
}