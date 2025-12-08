import Recipe from "../models/Recipe.js";
import { generateRecipes as generateRecipesAI } from "../services/openaiService.js";

/**
 * Generate recipes from ingredients using OpenAI
 * POST /api/recipes/generate
 */
export const generateRecipes = async (req, res) => {
  try {
    const { ingredients, preferences } = req.body;

    if (
      !ingredients ||
      typeof ingredients !== "string" ||
      !ingredients.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide ingredients",
      });
    }

    // Generate recipes using OpenAI
    const recipes = await generateRecipesAI(ingredients, preferences || {});

    res.json({
      success: true,
      data: recipes,
    });
  } catch (error) {
    console.error("Generate recipes error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to generate recipes",
    });
  }
};

/**
 * Save a recipe to user's collection
 * POST /api/recipes/save
 */
export const saveRecipe = async (req, res) => {
  try {
    const recipeData = req.body;

    // Check if recipe already exists for this user
    const existingRecipe = await Recipe.findOne({
      userId: req.user.id,
      title: recipeData.title,
    });

    if (existingRecipe) {
      // Update to saved status
      existingRecipe.isSaved = true;
      await existingRecipe.save();

      return res.json({
        success: true,
        data: existingRecipe,
      });
    }

    // Create new recipe
    const recipe = await Recipe.create({
      ...recipeData,
      userId: req.user.id,
      isSaved: true,
    });

    res.status(201).json({
      success: true,
      data: recipe,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get all saved recipes for user
 * GET /api/recipes/saved
 */
export const getSavedRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({
      userId: req.user.id,
      isSaved: true,
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: recipes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get a specific recipe
 * GET /api/recipes/:id
 */
export const getRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: "Recipe not found",
      });
    }

    res.json({
      success: true,
      data: recipe,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Unsave/delete a recipe (soft delete)
 * DELETE /api/recipes/:id
 */
export const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: "Recipe not found",
      });
    }

    // Soft delete: set isSaved to false instead of deleting
    recipe.isSaved = false;
    await recipe.save();

    res.json({
      success: true,
      data: {},
      message: "Recipe removed from My Recipes",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get all recipes (saved and generated history)
 * GET /api/recipes
 */
export const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: recipes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
