import Product from "../../../domain/product/entity/product";
import UpdateProductUseCase from "./update.product.usecase";

const defaultInput = {
    id: "f901c84f-f572-4d27-a2e1-eac412c33905",
    name: "Product 2 updated",
    price: 5.22,
}

const product = new Product("f901c84f-f572-4d27-a2e1-eac412c33905", "Product 2", 13.75);


const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
};

describe("Unit test update product use case", () => {
    it("should to update product", async () => {
        const updateProductUseCase = new UpdateProductUseCase(MockRepository());
        const output = await updateProductUseCase.execute(defaultInput);

        expect(output).toEqual(defaultInput);             
    });

    it("should thrown an error when product not found", async () => {
        const repository = MockRepository();
        repository.find.mockImplementation(() => {
            throw new Error("Product not found");
        });
        const updateProductUseCase = new UpdateProductUseCase(repository);
        const output = updateProductUseCase.execute(defaultInput);
         
        await expect(output).rejects.toThrow(
            "Product not found"
        );
    });

    it("should thrown an error when product update thrown error", async () => {
        const repository = MockRepository();
        repository.update.mockImplementation(() => {
            throw new Error("Error on update product");
        });
        const updateProductUseCase = new UpdateProductUseCase(repository);
        const output = updateProductUseCase.execute(defaultInput);
         
        await expect(output).rejects.toThrow(
            "Error on update product"
        );
    });

});