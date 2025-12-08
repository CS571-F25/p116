import { Row, Col, Card, Form, Button, Alert, Spinner } from "react-bootstrap";
import { FaWandMagicSparkles } from "react-icons/fa6";

export default function IngredientForm({
  ingredients,
  setIngredients,
  loading,
  error,
  onSubmit,
}) {
  return (
    <Row className="justify-content-center">
      <Col md={8} lg={6}>
        <Card className="input-card">
          <Card.Body className="p-4">
            <Form onSubmit={onSubmit}>
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
                  className="d-flex align-items-center justify-content-center gap-2"
                >
                  {loading ? (
                    <>
                      <Spinner animation="border" size="sm" />
                      Generating Recipes...
                    </>
                  ) : (
                    <>
                      <FaWandMagicSparkles /> Generate Recipes
                    </>
                  )}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
