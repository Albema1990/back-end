import dns from "node:dns";
dns.setServers(["1.1.1.1", "8.8.8.8"]);

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";

import productsRouter from "./routes/products.router.js";
import categoriesRouter from "./routes/categories.router.js";
import authRouter from "./routes/auth.router.js";
import pingRouter from "./routes/ping.router.js";


const app = express();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

app.use(express.json());

app.use("/products", productsRouter);
app.use("/categories", categoriesRouter);
app.use("/auth", authRouter);
app.use(pingRouter);

export default app;