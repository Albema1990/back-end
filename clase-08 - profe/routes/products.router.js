import { Router } from "express";

const router = Router();

import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
  getProductsByCategory,
} from "../controllers/products.controller.js";

// /products/search?name=ap
router.get("/search", searchProduct);

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", createProduct);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

router.get("/category/:categoryId", getProductsByCategory);

export default router;