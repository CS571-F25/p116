import express from "express";
import {
  generateRecipes,
  saveRecipe,
  getSavedRecipes,
  getRecipe,
  deleteRecipe,
  getPublicRecipes,
} from "../controllers/recipeController.js";
import { protect, optionalAuth } from "../middleware/auth.js";

const router = express.Router();

// Public routes (optional authentication to show isSaved status)
router.get("/public/all", optionalAuth, getPublicRecipes);

// Protected routes (require authentication)
router.use(protect);

router.post("/generate", generateRecipes);
router.post("/save", saveRecipe);
router.get("/saved", getSavedRecipes);
router.get("/:id", getRecipe);
router.delete("/:id", deleteRecipe);

export default router;
