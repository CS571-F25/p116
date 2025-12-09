import { Row, Col, Button } from "react-bootstrap";
import RecipeCard from "./RecipeCard";

export default function SuggestedRecipes({ recipes, onBack }) {
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="section-heading">✨ Suggested Recipes</h4>
        <Button variant="outline-secondary" onClick={onBack}>
          ← Back
        </Button>
      </div>
      <Row className="g-3">
        {recipes.slice(0, 3).map((recipe) => (
          <Col key={recipe.id} xs={12} sm={6} md={4} lg={4}>
            <RecipeCard recipe={recipe} />
          </Col>
        ))}
      </Row>
    </>
  );
}
