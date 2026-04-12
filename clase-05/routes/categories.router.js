import { Router } from "express";

const router = Router();

import { getAllCategories, updateCategory } from "../controllers/categories.controller.js";
import { getCategoryById } from "../controllers/categories.controller.js";
import { createCategory } from "../controllers/categories.controller.js";
import { deleteCategory } from "../controllers/categories.controller.js";   

router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.post("/", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;