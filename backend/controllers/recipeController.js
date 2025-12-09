import Recipe from "../models/Recipe.js";
import UserRecipe from "../models/UserRecipe.js";
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

    // Check if recipe with this title already exists
    let recipe = await Recipe.findOne({
      title: recipeData.title,
    });

    // If recipe doesn't exist, create it
    if (!recipe) {
      recipe = await Recipe.create({
        ...recipeData,
        createdBy: req.user.id,
      });
    }

    // Check if user already saved this recipe
    const existingUserRecipe = await UserRecipe.findOne({
      userId: req.user.id,
      recipeId: recipe._id,
    });

    if (existingUserRecipe) {
      return res.json({
        success: true,
        data: recipe,
        message: "Recipe already saved",
      });
    }

    // Create the user-recipe relationship
    await UserRecipe.create({
      userId: req.user.id,
      recipeId: recipe._id,
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
    // Get all user-recipe relationships for this user
    const userRecipes = await UserRecipe.find({
      userId: req.user.id,
    })
      .populate("recipeId")
      .sort({ savedAt: -1 });

    // Extract the recipes and add isSaved flag
    const recipes = userRecipes
      .map((ur) => ur.recipeId)
      .filter((recipe) => recipe !== null)
      .map((recipe) => ({
        ...recipe.toJSON(),
        isSaved: true,
      }));

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
    // Check if user has saved this recipe
    const userRecipe = await UserRecipe.findOne({
      userId: req.user.id,
      recipeId: req.params.id,
    });

    if (!userRecipe) {
      return res.status(404).json({
        success: false,
        message: "Recipe not found",
      });
    }

    // Get the recipe
    const recipe = await Recipe.findById(req.params.id);

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
 * Unsave/delete a recipe (remove user-recipe relationship)
 * DELETE /api/recipes/:id
 */
export const deleteRecipe = async (req, res) => {
  try {
    // Delete the user-recipe relationship
    const result = await UserRecipe.deleteOne({
      userId: req.user.id,
      recipeId: req.params.id,
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Recipe not found",
      });
    }

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
 * Get all public recipes (saved by any user)
 * GET /api/recipes/public/all
 * Optional authentication - if user is logged in, includes isSaved status
 */
export const getPublicRecipes = async (req, res) => {
  try {
    // Get all recipes sorted by creation date
    const recipes = await Recipe.find().sort({ createdAt: -1 });

    // If user is authenticated, check which recipes they've saved
    let userSavedRecipeIds = [];
    if (req.user) {
      const userRecipes = await UserRecipe.find({
        userId: req.user.id,
      }).select("recipeId");
      userSavedRecipeIds = userRecipes.map((ur) => ur.recipeId.toString());
    }

    // Add isSaved field to each recipe
    const recipesWithSavedStatus = recipes.map((recipe) => ({
      ...recipe.toJSON(),
      isSaved: userSavedRecipeIds.includes(recipe._id.toString()),
    }));

    res.json({
      success: true,
      data: recipesWithSavedStatus,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
