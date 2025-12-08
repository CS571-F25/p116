import { useState } from "react";
import { Container, Row, Alert, Button } from "react-bootstrap";
import IngredientForm from "./IngredientForm";
import SuggestedRecipes from "./SuggestedRecipes";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const [ingredients, setIngredients] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentStep, setCurrentStep] = useState("ingredients"); // 'ingredients' or 'recipes'
  const { isAuthenticated } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ingredients.trim()) {
      setError("Please enter at least one ingredient");
      return;
    }

    if (!isAuthenticated) {
      setError("Please log in to generate recipes");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Import the API service
      const { recipeAPI } = await import("../services/api.js");
      const { getUserPreferences } = await import("../utils/preferences.js");

      // Get user preferences for better recipe recommendations
      const preferences = getUserPreferences();

      // Generate recipes using the backend API
      const generatedRecipes = await recipeAPI.generateRecipes(
        ingredients,
        preferences
      );

      setRecipes(generatedRecipes);
      setCurrentStep("recipes");
    } catch (err) {
      console.error("Error generating recipes:", err);
      setError(err.message || "Failed to generate recipes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBackToIngredients = () => {
    setCurrentStep("ingredients");
    setRecipes([]);
    // setIngredients("");
  };

  return (
    <Container className="p-4">
      <Row className="my-4 text-center">
        <p
          className="lead"
          style={{ color: "var(--color-warm-brown)", fontSize: "1.25rem" }}
        >
          Turn your ingredients into delicious recipes ✨
        </p>
      </Row>

      {currentStep === "ingredients" ? (
        <IngredientForm
          ingredients={ingredients}
          setIngredients={setIngredients}
          loading={loading}
          error={error}
          onSubmit={handleSubmit}
        />
      ) : (
        <SuggestedRecipes recipes={recipes} onBack={handleBackToIngredients} />
      )}
    </Container>
  );
}
