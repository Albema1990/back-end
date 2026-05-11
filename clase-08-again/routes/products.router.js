import { Router } from "express";

const router = Router();

import { getAllProducts } from "../controllers/products.controller.js";
import { getProductById } from "../controllers/products.controller.js";
import { createProduct } from "../controllers/products.controller.js";
import { updateProduct } from "../controllers/products.controller.js";
import { deleteProduct } from "../controllers/products.controller.js";
import { getProductsByCategoryId } from "../controllers/products.controller.js";


// /products/search?name=ap 

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

router.get("/category/:categoryId", getProductsByCategoryId);

export default router;

