import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Alert,
} from "react-bootstrap";
import RecipeCard from "./RecipeCard";
import {
  saveRecipe,
  removeRecipe,
  getSavedRecipes,
} from "../utils/savedRecipes";

export default function Home() {
  const [ingredients, setIngredients] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentStep, setCurrentStep] = useState("ingredients"); // 'ingredients' or 'recipes'
  const [savedRecipeIds, setSavedRecipeIds] = useState(new Set());

  // Load saved recipe IDs on mount and when recipes change
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!ingredients.trim()) {
      setError("Please enter at least one ingredient");
      return;
    }

    setLoading(true);
    setError("");

    // TODO: Implement API call to OpenAI for recipe generation
    // For now, we'll simulate with placeholder data
    setTimeout(() => {
      setRecipes([
        {
          id: 1,
          title: "Recipe title",
          description: "Recipe description...",
          prepTime: "30 min",
          difficulty: "Easy",
          calories: "350",
          tags: ["tag1", "tag2", "tag3"],
        },
        {
          id: 2,
          title: "Recipe title",
          description: "Recipe description...",
          prepTime: "30 min",
          difficulty: "Easy",
          calories: "350",
          tags: ["tag1"],
        },
        {
          id: 3,
          title: "Recipe title",
          description: "Recipe description...",
          prepTime: "30 min",
          difficulty: "Easy",
          calories: "350",
          tags: ["tag2"],
        },
      ]);
      setLoading(false);
      setCurrentStep("recipes");
    }, 1000);
  };

  const handleBackToIngredients = () => {
    setCurrentStep("ingredients");
    setRecipes([]);
    // setIngredients("");
    setError("");
  };

  return (
    <Container className="p-4">
      {currentStep === "ingredients" ? (
        /* Step 1: Ingredient Input Form */
        <>
          <Row className="my-4 text-center">
            <p
              className="lead"
              style={{ color: "var(--color-warm-brown)", fontSize: "1.25rem" }}
            >
              Turn your ingredients into delicious recipes 🍳✨
            </p>
          </Row>
          <Row className="justify-content-center">
            <Col md={8} lg={6}>
              {/* <h4 className="section-heading mb-3 text-center">
              Enter Ingredients
            </h4> */}
              <Card className="input-card">
                <Card.Body className="p-4">
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label className="h6 mb-2">
                        What ingredients do you have?
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        placeholder="e.g., tomato, beef, potato, onion, garlic..."
                        value={ingredients}
                        onChange={(e) => setIngredients(e.target.value)}
                        disabled={loading}
                        style={{ fontSize: "16px", resize: "none" }}
                      />
                      <Form.Text className="text-muted mt-2 d-block">
                        💡 Separate multiple ingredients with commas
                      </Form.Text>
                    </Form.Group>

                    {error && (
                      <Alert variant="danger" className="mb-3">
                        {error}
                      </Alert>
                    )}

                    <div className="d-grid">
                      <Button
                        variant="primary"
                        type="submit"
                        size="lg"
                        disabled={loading}
                        className={loading ? "loading" : ""}
                      >
                        {loading ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            Generating Recipes...
                          </>
                        ) : (
                          <>Generate Recipes</>
                        )}
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      ) : (
        /* Step 2: Recipe Cards */
        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="section-heading">✨ Suggested Recipes</h4>
            <Button
              variant="outline-secondary"
              onClick={handleBackToIngredients}
            >
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
      )}
    </Container>
  );
}
