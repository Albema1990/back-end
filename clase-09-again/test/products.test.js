import { expect } from "chai";
import request from "supertest";
import app from "../app.js";
import Category from "../models/Category.js";

describe("Products endpoint", function () {
  it("debería tener un status 200 y un array", async function () {
    const res = await request(app).get("/products");

    // console.log(res.status, res.body);
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
  });

  it("El primer producto tiene que tener nombre", async function () {
    const res = await request(app).get("/products");

    expect(res.body[0]).to.have.property("name");
  });

  it("debería crear un producto", async function () {
    const category = await Category.findOne({ name: "Electronic" });
    // console.log(category, category.id);

    const newProduct = {
      name: "Laptop",
      price: 1100,
      stock: 6,
      category: category.id,
    };

    const res = await request(app).post("/products").send(newProduct);

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("name");
    expect(res.body.name).to.equal("Laptop");
  });
});
