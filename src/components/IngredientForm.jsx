import { Row, Col, Card, Form, Button, Alert, Spinner } from "react-bootstrap";
import { FaWandMagicSparkles, FaLock } from "react-icons/fa6";
import PreferencesDisplay from "./PreferencesDisplay";
import { useAuth } from "../context/AuthContext";

export default function IngredientForm({
  ingredients,
  setIngredients,
  loading,
  error,
  onSubmit,
}) {
  const { isAuthenticated } = useAuth();

  return (
    <Row className="justify-content-center">
      <Col md={8} lg={6}>
        <Card className="input-card">
          <Card.Body className="p-4">
            <Form onSubmit={onSubmit}>
              <Form.Group className="mb-3">
                <Form.Label className="h6 mb-3">
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
                  Separate multiple ingredients with commas
                </Form.Text>
              </Form.Group>

              {isAuthenticated && <PreferencesDisplay />}

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
                  disabled={!isAuthenticated || loading}
                  className="d-flex align-items-center justify-content-center gap-2"
                >
                  {!isAuthenticated ? (
                    <>
                      <FaLock />
                      Log In to Generate Recipes
                    </>
                  ) : loading ? (
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
