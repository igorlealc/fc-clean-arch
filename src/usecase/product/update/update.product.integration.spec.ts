import { Sequelize } from "sequelize-typescript";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import UpdateProductUseCase from "./update.product.usecase";

describe("Test update product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should update a product", async () => {
    const productRepository = new ProductRepository();

    const productName = "Product 1";
    const productPrice = 25.99;
    
    const updatedProductName = "Updated product name";
    const updatedPrice = 5.49;

    const product = ProductFactory.create("a", productName, productPrice);    

    await productRepository.create(product);

    const input = {
      id: product.id,
      name: updatedProductName,
      price: updatedPrice
    }

    const updateProductUseCase = new UpdateProductUseCase(productRepository);
    const output = await updateProductUseCase.execute(input);

    expect(output).toEqual(input); 

    
  });
});
