import express from "express";
import {
  generateRecipes,
  saveRecipe,
  getSavedRecipes,
  getRecipe,
  deleteRecipe,
  getAllRecipes,
} from "../controllers/recipeController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// All routes require authentication
router.use(protect);

router.post("/generate", generateRecipes);
router.post("/save", saveRecipe);
router.get("/saved", getSavedRecipes);
router.get("/", getAllRecipes);
router.get("/:id", getRecipe);
router.delete("/:id", deleteRecipe);

export default router;
