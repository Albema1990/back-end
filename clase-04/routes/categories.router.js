import { Router } from "express";

const router = Router();

import { getAllCategories } from "../controllers/categories.controller.js";
import { getCategoryById } from "../controllers/categories.controller.js";
import { createCategory } from "../controllers/categories.controller.js";


router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.post("/", createCategory);

export default router;