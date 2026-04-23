import { Router } from "express";
import { createCategoryType } from "../controllers/categoryType.controller.js";

const router = Router();

router.post("/category-type", createCategoryType);

export default router;