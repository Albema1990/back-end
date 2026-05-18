import { expect } from "chai";
import request from "supertest";
import app from "../app.js";
import Category from "../models/Category.js";
import Product from "../models/Product.js";

describe("Products endpoint", function () {
  this.timeout(10000);

  this.beforeEach(async function () {
    await Category.deleteMany({});


    const category = await Category.create({
      name: "Electronic",
    });

    await Product.create({
      name: "Smartphone",
      price: 500,
      stock: 10,
      category: category._id,
    });
  });

  it("debería tener un status 200 y un array", async function () {
    const res = await request(app).get("/products");

    // console.log(res.status, res.body);
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
    expect(res.body.length).to.equal(1);
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
