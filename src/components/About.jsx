import { Container, Row, Col, Card } from "react-bootstrap";

export default function About() {
  return (
    <Container className="mt-5">
      <Row>
        <Col md={10} className="mx-auto">
          <div className="text-center mb-5">
            <h1 className="hero-title display-3 mb-3">About SmartRecipe</h1>
            <p className="lead" style={{ color: "var(--color-warm-brown)" }}>
              Your AI-powered cooking companion
            </p>
          </div>

          <Card className="mb-5">
            <Card.Body className="p-5">
              <Card.Title
                as="h2"
                className="h4 mb-4"
                style={{ color: "var(--color-primary)" }}
              >
                What is SmartRecipe?
              </Card.Title>
              <Card.Text
                style={{
                  fontSize: "1.1rem",
                  lineHeight: "1.8",
                  color: "var(--color-warm-brown)",
                }}
              >
                Tired of staring at your fridge wondering what to make?
                SmartRecipe is your AI-powered cooking companion that turns
                those random ingredients in your kitchen into delicious meal
                ideas! Just tell us what you have, and we'll instantly whip up
                personalized recipe suggestions tailored to your taste buds.
              </Card.Text>
              <Card.Text
                style={{
                  fontSize: "1.1rem",
                  lineHeight: "1.8",
                  color: "var(--color-warm-brown)",
                }}
              >
                Got a tomato, some beef, and a potato? We might suggest a cozy
                Beef Stew with Tomatoes or a flavorful Spiced Beef and Potato
                Hash! Whether you're a busy student trying to make the most of
                your groceries or a professional short on time, SmartRecipe
                helps you answer that age-old question: "What should I cook
                today?"
              </Card.Text>
            </Card.Body>
          </Card>

          <Row>
            <Col md={6} className="mb-4">
              <Card className="h-100">
                <Card.Body className="p-4">
                  <Card.Title
                    as="h3"
                    className="h5 mb-4"
                    style={{ color: "var(--color-primary)" }}
                  >
                    ✨ Features
                  </Card.Title>
                  <ul className="mb-0" style={{ paddingLeft: "1.25rem" }}>
                    <li className="mb-3" style={{ lineHeight: "1.7" }}>
                      <strong style={{ color: "var(--color-warm-brown)" }}>
                        Recipe Generation:
                      </strong>{" "}
                      <span style={{ color: "var(--color-warm-brown)" }}>
                        AI-powered recipe suggestions based on your ingredients
                      </span>
                    </li>
                    <li className="mb-3" style={{ lineHeight: "1.7" }}>
                      <strong style={{ color: "var(--color-warm-brown)" }}>
                        Recipe Details:
                      </strong>{" "}
                      <span style={{ color: "var(--color-warm-brown)" }}>
                        View ingredient lists, step-by-step instructions, and
                        nutrition facts
                      </span>
                    </li>
                    <li className="mb-3" style={{ lineHeight: "1.7" }}>
                      <strong style={{ color: "var(--color-warm-brown)" }}>
                        Save Recipes:
                      </strong>{" "}
                      <span style={{ color: "var(--color-warm-brown)" }}>
                        Keep all your favorite recipes in one place
                      </span>
                    </li>
                    <li style={{ lineHeight: "1.7" }}>
                      <strong style={{ color: "var(--color-warm-brown)" }}>
                        Preference Mode:
                      </strong>{" "}
                      <span style={{ color: "var(--color-warm-brown)" }}>
                        Filter by dietary restrictions, cuisine style, and more
                      </span>
                    </li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} className="mb-4">
              <Card className="h-100">
                <Card.Body className="p-4">
                  <Card.Title
                    as="h3"
                    className="h5 mb-4"
                    style={{ color: "var(--color-primary)" }}
                  >
                    🛠️ Tech Stack
                  </Card.Title>
                  <ul className="mb-0" style={{ paddingLeft: "1.25rem" }}>
                    <li className="mb-3" style={{ lineHeight: "1.7" }}>
                      <strong style={{ color: "var(--color-warm-brown)" }}>
                        Frontend:
                      </strong>{" "}
                      <span style={{ color: "var(--color-warm-brown)" }}>
                        React, React Router, Vite
                      </span>
                    </li>
                    <li className="mb-3" style={{ lineHeight: "1.7" }}>
                      <strong style={{ color: "var(--color-warm-brown)" }}>
                        UI library:
                      </strong>{" "}
                      <span style={{ color: "var(--color-warm-brown)" }}>
                        React Bootstrap
                      </span>
                    </li>
                    <li style={{ lineHeight: "1.7" }}>
                      <strong style={{ color: "var(--color-warm-brown)" }}>
                        AI:
                      </strong>{" "}
                      <span style={{ color: "var(--color-warm-brown)" }}>
                        OpenAI API for recipe generation
                      </span>
                    </li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
