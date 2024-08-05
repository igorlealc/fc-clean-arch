export default class Product {
  private _id: String;
  private _name: String;
  private _price: number;

  constructor(id: String, name: String, price: number) {
    this._id = id;
    this._name = name;
    this._price = price;
    this.validate();
  }

  get id(): String {
    return this._id;
  }

  get name(): String {
    return this._name;
  }

  get price(): number {
    return this._price;
  }

  changeName(name: String): void {
    this._name = name;
    this.validate();
  }

  changePrice(price: number): void {
    this._price = price;
    this.validate();
  }

  validate(): boolean {
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }
    if (this._name.length === 0) {
      throw new Error("Name is required");
    }
    if (this._price < 0) {
      throw new Error("Price must be greater than zero");
    }
    return true;
  }
}
