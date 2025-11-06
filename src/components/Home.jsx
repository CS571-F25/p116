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
    <Container className="mt-4">
      {/* Hero Section */}
      <Row className="mb-5">
        <Col md={10} className="mx-auto text-center">
          <h1 className="display-4 mb-3">🧑‍🍳 SmartRecipe</h1>
          <p className="lead text-muted">
            Enter the ingredients you have, and we'll suggest delicious recipes
            for you to cook!
          </p>
        </Col>
      </Row>

      {/* Ingredient Input Form */}
      <Row className="mb-4">
        <Col md={8} className="mx-auto">
          <Card className="shadow-sm">
            <Card.Body className="p-4">
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label className="h5">
                    What ingredients do you have?
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="e.g., tomato, beef, potato, onion"
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    disabled={loading}
                  />
                  <Form.Text className="text-muted">
                    Separate multiple ingredients with commas
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
                  >
                    {loading ? "Generating Recipes..." : "Generate Recipes"}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* TODO: use separate component for recipe cards */}
      {recipes.length > 0 && (
        <Row>
          <Col>
            <h2 className="mb-4">Suggested Recipes</h2>
            <Row>
              {recipes.map((recipe) => (
                <Col md={4} key={recipe.id} className="mb-4">
                  <Card className="h-100 shadow-sm">
                    <Card.Body>
                      <Card.Title>{recipe.title}</Card.Title>
                      <Card.Text className="text-muted">
                        {recipe.description}
                      </Card.Text>
                      <div className="d-flex gap-2 mb-2">
                        <small className="badge bg-secondary">
                          {recipe.prepTime}
                        </small>
                        <small className="badge bg-info">
                          {recipe.difficulty}
                        </small>
                        <small className="badge bg-warning text-dark">
                          {recipe.calories} cal
                        </small>
                      </div>
                      <div className="d-flex gap-1 flex-wrap">
                        {recipe.tags.map((tag, idx) => (
                          <small key={idx} className="badge bg-light text-dark">
                            {tag}
                          </small>
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
