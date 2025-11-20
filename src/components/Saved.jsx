import { useState, useEffect } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import RecipeCard from "./RecipeCard";
import { getSavedRecipes, removeRecipe } from "../utils/savedRecipes";

export default function Saved() {
  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    loadSavedRecipes();
  }, []);

  const loadSavedRecipes = () => {
    const saved = getSavedRecipes();
    setSavedRecipes(saved);
  };

  const handleUnsaveRecipe = (recipeId) => {
    if (removeRecipe(recipeId)) {
      loadSavedRecipes(); // Reload after removing
    }
  };

  return (
    <Container className="p-4">
      <h5 className="section-heading mb-4">My Saved Recipes</h5>
      {savedRecipes.length > 0 ? (
        <Row className="g-3">
          {savedRecipes.map((recipe) => (
            <Col key={recipe.id} xs={12} sm={6} md={6} lg={4}>
              <RecipeCard
                recipe={recipe}
                isSaved={true}
                onUnsave={handleUnsaveRecipe}
              />
            </Col>
          ))}
        </Row>
      ) : (
        <div
          className="text-center"
          style={{ color: "var(--color-warm-brown)" }}
        >
          <p>No saved recipes yet.</p>
          <p>Start saving recipes from the Home page!</p>
        </div>
      )}
    </Container>
  );
}
