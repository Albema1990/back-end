import { Router } from "express";

const router = Router();

import { getAllProducts } from "../controllers/products.controller.js";
import { getProductById } from "../controllers/products.controller.js";
import { createProduct } from "../controllers/products.controller.js";
import { updateProduct } from "../controllers/products.controller.js";

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", createProduct);

router.put("/:id", updateProduct);

export default router;