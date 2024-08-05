export default class Address {
  _street: String = "";
  _number: number = 0;
  _zip: String = "";
  _city: String = "";

  constructor(street: String, number: number, zip: String, city: String) {
    this._street = street;
    this._number = number;
    this._zip = zip;
    this._city = city;

    this.validate();
  }

  get street(): String {
    return this._street;
  }

  get number(): number {
    return this._number;
  }

  get zip(): String {
    return this._zip;
  }

  get city(): String {
    return this._city;
  }
  
  validate() {
    if (this._street.length === 0) {
      throw new Error("Street is required");
    }
    if (this._number === 0) {
      throw new Error("Number is required");
    }
    if (this._zip.length === 0) {
      throw new Error("Zip is required");
    }
    if (this._city.length === 0) {
      throw new Error("City is required");
    }
  }

  toString() {
    return `${this._street}, ${this._number}, ${this._zip} ${this._city}`;
  }
}
