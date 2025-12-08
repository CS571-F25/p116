import { useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import RecipeCard from "./RecipeCard";
import {
  saveRecipe,
  removeRecipe,
  getSavedRecipes,
} from "../utils/savedRecipes";

export default function SuggestedRecipes({ recipes, onBack }) {
  const [savedRecipeIds, setSavedRecipeIds] = useState(new Set());

  // Load saved recipe IDs when recipes change
  useEffect(() => {
    if (recipes.length > 0) {
      const saved = getSavedRecipes();
      const savedIds = new Set(saved.map((r) => r.id));
      setSavedRecipeIds(savedIds);
    }
  }, [recipes]);

  const handleSaveRecipe = (recipe) => {
    if (saveRecipe(recipe)) {
      setSavedRecipeIds((prev) => new Set([...prev, recipe.id]));
    }
  };

  const handleUnsaveRecipe = (recipeId) => {
    if (removeRecipe(recipeId)) {
      setSavedRecipeIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(recipeId);
        return newSet;
      });
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="section-heading">✨ Suggested Recipes</h4>
        <Button variant="outline-secondary" onClick={onBack}>
          ← Back
        </Button>
      </div>
      <Row className="g-3">
        {recipes.slice(0, 3).map((recipe) => (
          <Col key={recipe.id} xs={12} sm={6} md={4} lg={4}>
            <RecipeCard
              recipe={recipe}
              isSaved={savedRecipeIds.has(recipe.id)}
              onSave={handleSaveRecipe}
              onUnsave={handleUnsaveRecipe}
            />
          </Col>
        ))}
      </Row>
    </>
  );
}
