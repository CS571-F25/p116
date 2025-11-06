import { Container, Row, Col, Card } from "react-bootstrap";

export default function About() {
  return (
    <Container className="mt-4">
      <Row>
        <Col md={10} className="mx-auto">
          <h1 className="display-4 mb-4 text-center">About SmartRecipe</h1>

          <Card className="mb-4 shadow-sm">
            <Card.Body className="p-4">
              <Card.Title className="h4 mb-3">What is SmartRecipe?</Card.Title>
              <Card.Text>
                Tired of staring at your fridge wondering what to make?
                SmartRecipe is your AI-powered cooking companion that turns
                those random ingredients in your kitchen into delicious meal
                ideas! Just tell us what you have, and we'll instantly whip up
                personalized recipe suggestions tailored to your taste buds.
              </Card.Text>
              <Card.Text>
                Got a tomato, some beef, and a potato? We might suggest a cozy
                Beef Stew with Tomatoes or a flavorful Spiced Beef and Potato
                Hash! Whether you're a busy student trying to make the most of
                your groceries or a professional short on time, SmartRecipe
                helps you answer that age-old question: "What should I cook
                today?" 🎉
              </Card.Text>
            </Card.Body>
          </Card>

          <Row>
            <Col md={6} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title className="h5">✨ Features</Card.Title>
                  <ul className="mb-0">
                    <li>
                      <strong>Recipe Generation:</strong> AI-powered recipe
                      suggestions based on your ingredients
                    </li>
                    <li>
                      <strong>Recipe Details:</strong> View ingredient lists,
                      step-by-step instructions, and nutrition facts
                    </li>
                    <li>
                      <strong>Save/Favorite:</strong> Save your favorite recipes
                      for later
                    </li>
                    <li>
                      <strong>Preference Modes:</strong> Filter by dietary
                      restrictions, cuisine style, and more
                    </li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title className="h5">🛠️ Tech Stack</Card.Title>
                  <ul className="mb-0">
                    <li>
                      <strong>Frontend:</strong> React, React Router, Vite
                    </li>
                    <li>
                      <strong>UI library:</strong> React Bootstrap
                    </li>
                    <li>
                      <strong>AI:</strong> OpenAI API for recipe generation
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
