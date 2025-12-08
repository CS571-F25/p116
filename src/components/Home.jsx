import { useState } from "react";
import { Container, Row, Alert, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import IngredientForm from "./IngredientForm";
import SuggestedRecipes from "./SuggestedRecipes";

export default function Home() {
  const [ingredients, setIngredients] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentStep, setCurrentStep] = useState("ingredients"); // 'ingredients' or 'recipes'
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ingredients.trim()) {
      setError("Please enter at least one ingredient");
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

  if (!isAuthenticated) {
    return (
      <div className="mt-5 p-4 text-center">
        <h3>🔒 Log in to generate recipes!</h3>
        <p
          className="mt-3"
          style={{ color: "var(--color-warm-brown)", fontSize: "1.25rem" }}
        >
          Create a free account to use AI-powered recipe generation and save
          your favorites.
        </p>

        <div style={{ marginTop: "2rem" }}>
          <Button variant="primary" onClick={() => navigate("/login")}>
            Log In
          </Button>
        </div>
        <div className="mt-2">
          <Button
            variant="link"
            className="text-muted"
            onClick={() => navigate("/signup")}
            // style={{ color: "var(--color-warm-brown)" }}
          >
            Don't have an account? Register
          </Button>
        </div>
      </div>
    );
  }

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
