import CreateProductUseCase from "./create.product.usecase";

const defaultInput = {
  name: "Product 1",
  price: 12.0,
  type: "a"
}

const nameMisssingInput = {
  name: "",
  price: 12.0,
  type: "a"
}

const priceLess0Input = {
  name: "Product 1",
  price: -12.0,
  type: "a"
}

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test create product use case", () => {
  it("should create a product", async () => {
    const createProductUseCase = new CreateProductUseCase(MockRepository());
    const output = await createProductUseCase.execute(defaultInput);

    expect(output).toEqual({
      id: expect.any(String),
      name: defaultInput.name,
      price: defaultInput.price,
    });
  });

  it("should thrown an error when name is missing", async () => {
    const createProductUseCase = new CreateProductUseCase(MockRepository());
    const output = createProductUseCase.execute(nameMisssingInput);

    await expect(output).rejects.toThrow(
      "product: Name is required"
    );
  });

  it("should thrown an error when price is less than 0", async () => {
    const createProductUseCase = new CreateProductUseCase(MockRepository());
    const output = createProductUseCase.execute(priceLess0Input);

    await expect(output).rejects.toThrow(
      "product: Price must be greater than zero"
    );
  });


});
