import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.usecase";

const defaultInput = {
    id: "f901c84f-f572-4d27-a2e1-eac412c33905",
}
const product = new Product("f901c84f-f572-4d27-a2e1-eac412c33905", "Product 1", 22.0);

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
};

describe("Unit test find product use case", () => {
    it("should find a product by id", async () => {
        const findProductUseCase = new FindProductUseCase(MockRepository());
        const output = await findProductUseCase.execute(defaultInput);

        expect(output).toEqual({
            id: product.id,
            name: product.name,
            price: product.price,
        });
    });

    it("should thrown an error when product not found", async () => {
        const repository = MockRepository();
        repository.find.mockImplementation(() => {
            throw new Error("Product not found");
        });
        const createProductUseCase = new FindProductUseCase(repository);
        const output = createProductUseCase.execute(defaultInput);

        await expect(output).rejects.toThrow(
            "Product not found"
        );
    });

});