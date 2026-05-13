import { expect } from "chai";
import request from "supertest";
import app from "../app.js";

describe("Categories endpoint", function () {
  it("debería tener un status 200 y un array", async function () {
    const res = await request(app).get("/categories");

    // console.log(res.status, res.body);
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
  });

  it("La primera categoría tiene que tener nombre", async function(){
    const res =await request(app).get("/categories");
    expect(res.body[0]).to.have.property("name");
  })

  it("debería crear una categoría", async function () {
  
      const newCategory = {
        name: "Electronic",
        description: "Electronic parts ",
      };
  
      const res = await request(app).post("/categories").send(newCategory);
  
      expect(res.status).to.equal(201);
      expect(res.body).to.have.property("name");
      expect(res.body).to.have.property("description");
    });
});
