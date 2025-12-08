import { useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import RecipeCard from "./RecipeCard";
import { recipeAPI } from "../services/api";

export default function SuggestedRecipes({ recipes, onBack }) {
  const [savedRecipeIds, setSavedRecipeIds] = useState(new Set());
  const [loading, setLoading] = useState(false);

  // Load saved recipe IDs when recipes change
  useEffect(() => {
    if (recipes.length > 0) {
      loadSavedRecipes();
    }
  }, [recipes]);

  const loadSavedRecipes = async () => {
    try {
      const saved = await recipeAPI.getSavedRecipes();
      const savedIds = new Set(saved.map((r) => r._id || r.id));
      setSavedRecipeIds(savedIds);
    } catch (err) {
      console.error('Error loading saved recipes:', err);
    }
  };

  const handleSaveRecipe = async (recipe) => {
    try {
      setLoading(true);
      const savedRecipe = await recipeAPI.saveRecipe(recipe);
      setSavedRecipeIds((prev) => new Set([...prev, savedRecipe._id || recipe.id]));
    } catch (err) {
      console.error('Error saving recipe:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUnsaveRecipe = async (recipeId) => {
    try {
      setLoading(true);
      await recipeAPI.deleteRecipe(recipeId);
      setSavedRecipeIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(recipeId);
        return newSet;
      });
    } catch (err) {
      console.error('Error deleting recipe:', err);
    } finally {
      setLoading(false);
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
