export default class OrderItem {
  private _id: String;
  private _productId: String;
  private _name: String;
  private _price: number;
  private _quantity: number;

  constructor(
    id: String,
    name: String,
    price: number,
    productId: String,
    quantity: number
  ) {
    this._id = id;
    this._name = name;
    this._price = price;
    this._productId = productId;
    this._quantity = quantity;
  }

  get id(): String {
    return this._id;
  }

  get name(): String {
    return this._name;
  }

  get productId(): String {
    return this._productId;
  }

  get quantity(): number {
    return this._quantity;
  }

  get price(): number {
    return this._price;
  }

  get totalprice(): number {
    return this._price * this._quantity;
  }
}
