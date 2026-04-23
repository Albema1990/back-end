// Solo para el profesor, para evitar problemas de DNS en la conexión a MongoDB Atlas
import dns from "node:dns";
dns.setServers(["1.1.1.1", "8.8.8.8"]);

import express from "express";
import mongoose from "mongoose";

import productsRouter from "./routes/products.router.js";
import categoriesRouter from "./routes/categories.router.js";
import pingRouter from "./routes/ping.router.js";
import categoryTypeRouter from "./routes/categoryType.router.js";

const app = express();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log(error));

app.use(express.json());

app.use("/products", productsRouter);
app.use("/categories", categoriesRouter);
app.use(pingRouter);
app.use(categoryTypeRouter);

app.listen(3000, () => console.log("http://localhost:3000"));