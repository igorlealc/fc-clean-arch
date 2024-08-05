import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerAddressChangedEvent from "../customer-address-changed.event";

export default class ConsoleLogWhenAddressIsChangedHandler implements EventHandlerInterface<CustomerAddressChangedEvent>{
    handle(event: CustomerAddressChangedEvent): void {
        console.log("Endereço do cliente: " + event.eventData.clientId + ", " + event.eventData.clientName + " alterado para: " + event.eventData.address);
    }    
}