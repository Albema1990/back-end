import { expect } from "chai";
import request from "supertest";
import app from "../app.js";

import User from "../models/user.js";

describe("Auth User", async function () {
    beforeEach(() => {
        await User.deleteMany({});
    });

    it("debería registrar un usuario nuevo", async function (){
        const res = await request(app).post("/auth/register").send({
            email: "test@example.com",
            password: "password123",
        });

        expect (res.status).to.equal(201);
    });
});