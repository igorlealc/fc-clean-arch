import Product from "../entity/product";
import { v4 as uuid } from "uuid";
import ProductB from "../entity/product-b";
import ProductEntity from "../entity/product.entity";

export default class ProductFactory {
  public static create(
    type: string,
    name: string,
    price: number
  ): ProductEntity {
    switch (type) {
      case "a":
        return new Product(uuid(), name, price);
      case "b":
        return new ProductB(uuid(), name, price);
      default:
        throw new Error("Product type not supported");
    }
  }
}
