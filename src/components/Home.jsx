import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Alert,
} from "react-bootstrap";

export default function Home() {
  const [ingredients, setIngredients] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    }, 1000);
  };

  return (
    <Container className="mt-5">
      {/* Hero Section */}
      <Row className="mb-5">
        <Col md={10} className="mx-auto text-center">
          <div className="hero-section">
            <h1 className="hero-title display-3 mb-4">SmartRecipe</h1>
            <p
              className="lead"
              style={{ color: "var(--color-warm-brown)", fontSize: "1.25rem" }}
            >
              Enter the ingredients you have, and we'll suggest delicious
              recipes for you to cook!
            </p>
            <p className="text-muted mt-3" style={{ fontSize: "1rem" }}>
              Turn your kitchen into a culinary adventure 🍳✨
            </p>
          </div>
        </Col>
      </Row>

      {/* Ingredient Input Form */}
      <Row className="mb-5">
        <Col md={8} lg={7} className="mx-auto">
          <Card className="input-card">
            <Card.Body className="p-5">
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4">
                  <Form.Label className="h5 mb-3">
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
                  <Alert variant="danger" className="mb-4">
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
                      <>🍽️ Generate Recipes</>
                    )}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Recipe Cards */}
      {recipes.length > 0 && (
        <Row className="mb-5">
          <Col>
            <h2 className="section-heading">✨ Suggested Recipes</h2>
            <Row>
              {recipes.map((recipe) => (
                <Col md={4} key={recipe.id} className="mb-4">
                  <Card className="recipe-card h-100">
                    <Card.Body className="p-4">
                      <Card.Title
                        className="h5 mb-3"
                        style={{ color: "var(--color-warm-brown)" }}
                      >
                        {recipe.title}
                      </Card.Title>
                      <Card.Text
                        className="text-muted mb-3"
                        style={{ minHeight: "48px" }}
                      >
                        {recipe.description}
                      </Card.Text>
                      <div className="d-flex gap-2 mb-3 flex-wrap">
                        <span className="badge badge-time">
                          ⏱️ {recipe.prepTime}
                        </span>
                        <span className="badge badge-difficulty">
                          {recipe.difficulty}
                        </span>
                        <span className="badge badge-calories">
                          🔥 {recipe.calories} cal
                        </span>
                      </div>
                      <div className="d-flex gap-1 flex-wrap">
                        {recipe.tags.map((tag, idx) => (
                          <span key={idx} className="badge badge-tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      )}

      {/* Empty State */}
      {/* {recipes.length === 0 && !loading && (
        <Row>
          <Col md={8} className="mx-auto text-center">
            <div className="text-muted">
              <p className="mb-0">
                👆 Enter your ingredients above to get started!
              </p>
            </div>
          </Col>
        </Row>
      )} */}
    </Container>
  );
}
