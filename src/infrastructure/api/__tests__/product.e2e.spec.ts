import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for customer", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a product", async () => {
        const name = "Product 1";
        const price = 5.47;

        const response = await request(app)
            .post("/product")
            .send({
                name: name,
                price: price
            });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe(name);
        expect(response.body.price).toBe(price);
    });

    it("should not create a product", async () => {
        const response = await request(app).post("/product").send({});
        expect(response.status).toBe(500);
      });

    it("should list all products", async () => {
        const products = [
            {
                name: "Product 1",
                price: 5.47
            },
            {
                name: "Product 2",
                price: 8.29
            }
        ];

        await request(app)
            .post("/product")
            .send(products[0]);

        await request(app)
            .post("/product")
            .send(products[1]);

        const response = await request(app)
            .get("/product")
            .send();

        expect(response.status).toBe(200);
        expect(response.body.products.length).toBe(2);
        response.body.products.forEach(function (item: any, index: number) {
            let product = products[index];
            expect(item.name).toEqual(product.name);
            expect(item.price).toEqual(product.price);
        });
    });

})