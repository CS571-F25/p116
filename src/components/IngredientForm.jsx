import { useState } from "react";
import { Row, Col, Form, Button, Card, Alert } from "react-bootstrap";

export default function IngredientForm({ onSubmit, loading, error }) {
  const [ingredients, setIngredients] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(ingredients);
  };

  return (
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
  );
}
