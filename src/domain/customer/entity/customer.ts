import EventDispatcher from "../../@shared/event/event-dispatcher";
import CustomerAddressChangedEvent from "../event/customer-address-changed.event";
import CustomerCreatedEvent from "../event/customer-created.event";
import ConsoleLogWhenAddressIsChangedHandler from "../event/handler/console-log-when-address-is-changed-handler";
import ConsoleLogWhenCustomeIsCreated1Handler from "../event/handler/console-log-when-custome-Is-created-1.handler";
import ConsoleLogWhenCustomeIsCreated2Handler from "../event/handler/console-log-when-custome-Is-created-2.handler";
import Address from "./address";

export default class Customer {
  private _id: String;
  private _name: String = "";
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints: number = 0;
  private _eventDispatcher: EventDispatcher = new EventDispatcher();

  constructor(id: String, name: String) {
    this._configureDomainEvents();
    this._id = id;
    this._name = name;
    this.validate();    
    this._eventDispatcher.notify(new CustomerCreatedEvent({
      id: id,
      name: name      
    }));
  }

  get id(): String {
    return this._id;
  }

  get name(): String {
    return this._name;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }
    if (this._name.length === 0) {
      throw new Error("Name is required");
    }
  }

  changeName(name: String) {
    this._name = name;
    this.validate();
  }

  get Address(): Address {
    return this._address;
  }
  
  changeAddress(address: Address) {
    this._address = address;
    this._eventDispatcher.notify(new CustomerAddressChangedEvent({
      clientId: this.id,
      clientName: this.name ,
      address: address.toString()
    }));
  }

  isActive(): boolean {
    return this._active;
  }

  activate() {
    if (this._address === undefined) {
      throw new Error("Address is mandatory to activate a customer");
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }

  set Address(address: Address) {
    this._address = address;
  }

  _configureDomainEvents(){
    this._eventDispatcher.register("CustomerCreatedEvent", new ConsoleLogWhenCustomeIsCreated1Handler());
    this._eventDispatcher.register("CustomerCreatedEvent", new ConsoleLogWhenCustomeIsCreated2Handler());
    this._eventDispatcher.register("CustomerAddressChangedEvent", new ConsoleLogWhenAddressIsChangedHandler());
  }
}
