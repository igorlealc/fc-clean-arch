import { Sequelize } from "sequelize-typescript";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ListProductUseCase from "./list.product.usecase";

describe("Integration Test list product use case", () => {
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

  it("should list all products", async () => {
    const productRepository = new ProductRepository();
    const usecase = new ListProductUseCase(productRepository);


    const products = [
      ProductFactory.create("a", "Product 1", 25.99),
      ProductFactory.create("b", "Product 2", 47.59)
    ];

    for (const product of products) {
      await productRepository.create(product);
    }

    const input = {};

    const output = await usecase.execute(input);

    expect(output.products.length).toBe(2);
    output.products.forEach(function (item, index) {
      let product = products[index];
      expect(item).toEqual({
        id: product.id,
        name: product.name,
        price: product.price,
      });
    });
  });
});
