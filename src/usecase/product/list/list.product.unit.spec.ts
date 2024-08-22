import Product from "../../../domain/product/entity/product";
import ListProductUseCase from "./list.product.usecase";
import FindProductUseCase from "./list.product.usecase";

const defaultInput = {}
const products = [
    new Product("f901c84f-f572-4d27-a2e1-eac412c33905", "Product 1", 22.0),
    new Product("243e79bd-20d0-4cd8-abf1-c519cb1d5be9", "Product 2", 13.75),
];

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve(products)),
        create: jest.fn(),
        update: jest.fn(),
    };
};

describe("Unit test list products use case", () => {
    it("should to list products", async () => {
        const listProductUseCase = new ListProductUseCase(MockRepository());
        const output = await listProductUseCase.execute(defaultInput);

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