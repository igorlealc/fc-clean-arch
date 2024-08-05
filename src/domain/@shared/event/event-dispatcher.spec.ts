import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/send-email-when-product-is-criated.handler";
import ProductCreatedEvent from "../../product/event/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe("Domain events tets", () => {
  it("should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register('ProductCreatedEvent', eventHandler);

    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toBeDefined()
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'].length).toBe(1)
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]).toMatchObject(eventHandler)    

  }); 

  it("should unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register('ProductCreatedEvent', eventHandler);
    eventDispatcher.unregister('ProductCreatedEvent', eventHandler);

    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toBeDefined()
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'].length).toBe(0)    

  }); 

  it("should unregister all events", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register('ProductCreatedEvent', eventHandler);
    eventDispatcher.unregisterAll();

    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toBeUndefined() 

  }); 

  it("should notify all events", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    const productCreatedEvent = new ProductCreatedEvent({
      price: 5.0,
      name: 'product 1',
      id: '1'
    });

    eventDispatcher.register('ProductCreatedEvent', eventHandler);
    eventDispatcher.notify(productCreatedEvent);
    expect(spyEventHandler).toBeCalled();

  }); 
});
