import { GameEvent, EventBus, EventHandler, EventType } from "../src/index";

class SomeType extends EventType {
    a: number;
    b: number;
    constructor (a: number, b: number) {
        super();
        this.a = a;
        this.b = b;
    }
}

let someValue = 0;

const eventBus = new EventBus();

const eventHandler = new EventHandler<SomeType>(eventBus, "sometype", (e) => {
    someValue = e.a + e.b;
});

eventBus.createHandler(eventHandler);

test('Test Event Handler', () => {
    const event = new GameEvent<SomeType>(eventBus, new SomeType(5, 10), "sometype");
    eventBus.createEvent(event);
    event.send(eventBus);
    expect(someValue).toEqual(15);
});