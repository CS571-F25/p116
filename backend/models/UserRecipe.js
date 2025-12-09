import mongoose from "mongoose";

/**
 * Junction table for the many-to-many relationship between Users and Recipes
 * Allows storing additional metadata about the relationship
 */
const userRecipeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recipeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe",
      required: true,
    },
    savedAt: {
      type: Date,
      default: Date.now,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index to ensure a user can only save a recipe once
userRecipeSchema.index({ userId: 1, recipeId: 1 }, { unique: true });

// Index for efficient queries
userRecipeSchema.index({ userId: 1, savedAt: -1 });
userRecipeSchema.index({ recipeId: 1 });

const UserRecipe = mongoose.model("UserRecipe", userRecipeSchema);

export default UserRecipe;
