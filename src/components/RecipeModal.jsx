import { Modal, Button, Badge } from "react-bootstrap";

export default function RecipeModal({
  recipe,
  show,
  onHide,
  isSaved = false,
  onSave,
}) {
  if (!recipe) return null;

  const handleSaveClick = () => {
    if (onSave) {
      onSave();
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title
          style={{
            color: "var(--color-warm-brown)",
            fontWeight: 600,
          }}
        >
          {recipe.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <p className="text-muted" style={{ fontSize: "1rem" }}>
            {recipe.description}
          </p>
        </div>

        <div className="d-flex gap-2 mb-2 flex-wrap">
          <Badge className="badge badge-time">⏱️ {recipe.prepTime}</Badge>
          <Badge className="badge badge-difficulty">{recipe.difficulty}</Badge>
          <Badge className="badge badge-calories">
            🔥 {recipe.calories} cal
          </Badge>
        </div>

        {recipe.tags?.length > 0 && (
          <div className="d-flex gap-2 flex-wrap">
            {recipe.tags.map((tag, idx) => (
              <Badge key={idx} bg="#fff8f0" className="badge badge-tag">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {recipe.ingredients?.length > 0 && (
          <div className="my-4">
            <h6
              style={{
                color: "var(--color-warm-brown)",
                fontWeight: 600,
                marginBottom: "0.75rem",
              }}
            >
              Ingredients
            </h6>
            <ul style={{ paddingLeft: "1.5rem" }}>
              {recipe.ingredients.map((ingredient, idx) => (
                <li key={idx} style={{ marginBottom: "0.5rem" }}>
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>
        )}

        {recipe.instructions?.length > 0 && (
          <div className="mb-4">
            <h6
              style={{
                color: "var(--color-warm-brown)",
                fontWeight: 600,
                marginBottom: "0.75rem",
              }}
            >
              Instructions
            </h6>
            <ol style={{ paddingLeft: "1.5rem" }}>
              {recipe.instructions.map((instruction, idx) => (
                <li key={idx} style={{ marginBottom: "0.75rem" }}>
                  {instruction}
                </li>
              ))}
            </ol>
          </div>
        )}

        {recipe.tips && recipe.tips.length > 0 && (
          <div className="mb-4">
            <h6
              style={{
                color: "var(--color-warm-brown)",
                fontWeight: 600,
                marginBottom: "0.75rem",
              }}
            >
              Cooking Tips
            </h6>
            <ul style={{ paddingLeft: "1.5rem" }}>
              {recipe.tips.map((tip, idx) => (
                <li key={idx} style={{ marginBottom: "0.5rem" }}>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Modal.Body>
      {/* <Modal.Footer>
        <Button variant="primary" onClick={handleSaveClick}>
          {isSaved ? "Unsave Recipe" : "Save Recipe"}
        </Button>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer> */}
    </Modal>
  );
}
