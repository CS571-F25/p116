import { useState } from "react";
import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import RecipeModal from "./RecipeModal";

export default function RecipeCard({ recipe, onSave, onUnsave }) {
  const [showModal, setShowModal] = useState(false);
  const [isSaved, setIsSaved] = useState(!!recipe.isSaved);
  const [loading, setLoading] = useState(false);

  const handleSave = async (e) => {
    e.stopPropagation();
    if (loading) return;
    if (!isSaved && onSave) {
      setLoading(true);
      const success = await onSave(recipe.id);
      setLoading(false);
      success && setIsSaved(true);
    }
  };

  const handleUnsave = async (e) => {
    e.stopPropagation();
    if (loading) return;
    if (isSaved && onUnsave) {
      setLoading(true);
      const success = await onUnsave(recipe.id);
      setLoading(false);
      success && setIsSaved(false);
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
      <Card className="recipe-card" onClick={handleCardClick}>
        <Card.Body className="p-4">
          <div className="d-flex justify-content-between align-items-start mb-3">
            <Card.Title
              className="h5 mb-0 me-2"
              style={{ color: "var(--color-warm-brown)", flex: 1 }}
            >
              {recipe.title}
            </Card.Title>
            {isSaved ? (
              <OverlayTrigger
                placement="top"
                delay={{ show: 250 }}
                overlay={<Tooltip>Remove from My Recipes</Tooltip>}
              >
                <div
                  onClick={handleUnsave}
                  style={{
                    cursor: "pointer",
                    fontSize: "1.5rem",
                    color: "var(--color-primary)",
                  }}
                >
                  <FaHeart />
                </div>
              </OverlayTrigger>
            ) : (
              <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 400 }}
                overlay={<Tooltip>Save to My Recipes</Tooltip>}
              >
                <div
                  onClick={handleSave}
                  style={{
                    cursor: "pointer",
                    fontSize: "1.5rem",
                    color: "var(--color-primary)",
                  }}
                >
                  <FaRegHeart />
                </div>
              </OverlayTrigger>
            )}
          </div>
          <div className="d-flex gap-2 mb-3 flex-wrap">
            <span className="badge badge-time">⏱️ {recipe.prepTime}</span>
            <span className="badge badge-difficulty">{recipe.difficulty}</span>
            <span className="badge badge-calories">
              🔥 {recipe.calories} cal
            </span>
          </div>
          <Card.Text
            className="text-muted mb-3"
            style={{ minHeight: "40px", fontSize: "0.9rem" }}
          >
            {recipe.description}
          </Card.Text>
          <div className="d-flex gap-2 flex-wrap">
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
        onSave={handleSave}
      />
    </>
  );
}
