import express from "express";
import productsRouter from "./routes/products.router.js";
import categoriesRouter from "./routes/categories.router.js";
import pingRouter from "./routes/ping.router.js";

const app = express();

app.use(express.json());

app.use("/products", productsRouter);
app.use("/categories", categoriesRouter);
app.use(pingRouter);

app.listen(3000, () => console.log("http://localhost:3000"));
