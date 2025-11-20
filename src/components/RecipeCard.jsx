import { useState } from "react";
import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import RecipeModal from "./RecipeModal";

export default function RecipeCard({
  recipe,
  isSaved = false,
  onSave,
  onUnsave,
}) {
  const [showModal, setShowModal] = useState(false);

  const handleSaveClick = (e) => {
    e.stopPropagation();
    if (isSaved && onUnsave) {
      onUnsave(recipe.id);
    } else if (!isSaved && onSave) {
      onSave(recipe);
    }
  };

  const handleCardClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Card
        className="recipe-card"
        onClick={handleCardClick}
        style={{ cursor: "pointer" }}
      >
        <Card.Body className="p-4">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <Card.Title
              className="h5 mb-2"
              style={{ color: "var(--color-warm-brown)", flex: 1 }}
            >
              {recipe.title}
            </Card.Title>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>{isSaved ? "Unsave" : "Save"}</Tooltip>}
            >
              <div
                onClick={handleSaveClick}
                style={{
                  width: "36px",
                  height: "36px",
                  cursor: "pointer",
                  fontSize: "1.5rem",
                  color: "var(--color-primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {isSaved ? <BsBookmarkFill /> : <BsBookmark />}
              </div>
            </OverlayTrigger>
          </div>
          <Card.Text
            className="text-muted mb-3"
            style={{ minHeight: "40px", fontSize: "0.9rem" }}
          >
            {recipe.description}
          </Card.Text>
          <div className="d-flex gap-2 mb-2 flex-wrap">
            <span className="badge badge-time">⏱️ {recipe.prepTime}</span>
            <span className="badge badge-difficulty">{recipe.difficulty}</span>
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
      <RecipeModal
        recipe={recipe}
        show={showModal}
        onHide={handleCloseModal}
        isSaved={isSaved}
        onSave={handleSaveClick}
      />
    </>
  );
}
