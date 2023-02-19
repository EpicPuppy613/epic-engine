import { GameEvent } from "./event.js"
import { EventHandler } from "./eventhandler.js";

export class EventBus {
    private events: Map<number, GameEvent<any>>;
    private handlers: Map<number, EventHandler<any>>;
    private handleTypes: Map<string, number[]>;
    private nextId: number;

    constructor () {
        this.events = new Map();
        this.handlers = new Map();
        this.handleTypes = new Map();
        this.nextId = 0;
    }

    getNextId(): number {
        return ++this.nextId;
    }

    createEvent(event: GameEvent<any>): void {
        this.events.set(event.id, event);
    }

    createHandler(handler: EventHandler<any>): void {
        this.handlers.set(handler.id, handler);
        const type = this.handleTypes.get(handler.type);
        if (type === undefined) {
            this.handleTypes.set(handler.type, [handler.id]);
        } else {
            type.push(handler.id);
            this.handleTypes.set(handler.type, type);
        }
    }

    getEvent(id: number): GameEvent<any> | undefined {
        return this.events.get(id);
    }

    getHandler(id: number): EventHandler<any> | undefined {
        return this.handlers.get(id);
    }

    sendEvent(id: number): void {
        const event = this.getEvent(id);
        if (event === undefined) throw new ReferenceError("Specified event ID does not exist");
        const handlers = this.handleTypes.get(event.type);
        if (handlers === undefined) return;
        for (const handlerId of handlers) {
            const handler = this.handlers.get(handlerId);
            if (handler === undefined) continue;
            handler.handle(event);
        }
    }
}