import { useState } from "react";
import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import { HiMiniChartBar } from "react-icons/hi2";
import { IoTime } from "react-icons/io5";
import { FaFire } from "react-icons/fa";
import RecipeModal from "./RecipeModal";

export function AttributeList({ recipe }) {
  return (
    <div className="d-flex gap-2 mb-3 flex-wrap">
      <span className="badge badge-difficulty">
        <HiMiniChartBar /> {recipe.difficulty}
      </span>
      <span className="badge badge-time">
        <IoTime /> {recipe.prepTime}
      </span>
      <span className="badge badge-calories">
        <FaFire /> {recipe.calories} cal
      </span>
    </div>
  );
}

export function TagList({ tags }) {
  return (
    <div className="d-flex gap-2 flex-wrap">
      {tags.map((tag) => (
        <span key={tag} className="badge badge-tag">
          {tag}
        </span>
      ))}
    </div>
  );
}

export default function RecipeCard({ recipe, onSave, onUnsave }) {
  const [showModal, setShowModal] = useState(false);
  const [isSaved, setIsSaved] = useState(!!recipe.isSaved);
  const [loading, setLoading] = useState(false);

  const handleSave = async (e) => {
    e.stopPropagation();
    if (loading) return;
    if (!isSaved && onSave) {
      setLoading(true);
      const success = await onSave(recipe);
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
            <OverlayTrigger
              placement="top"
              delay={{ show: 250 }}
              overlay={
                <Tooltip>
                  {isSaved ? "Remove from My Recipes" : "Save to My Recipes"}
                </Tooltip>
              }
            >
              <div
                onClick={isSaved ? handleUnsave : handleSave}
                style={{
                  cursor: "pointer",
                  fontSize: "28px",
                  color: "var(--color-primary)",
                  lineHeight: 0,
                }}
              >
                {isSaved ? <HiHeart /> : <HiOutlineHeart />}
              </div>
            </OverlayTrigger>
          </div>
          <AttributeList recipe={recipe} />
          <Card.Text
            className="text-muted mb-3"
            style={{ minHeight: "40px", fontSize: "0.9rem" }}
          >
            {recipe.description}
          </Card.Text>
          <TagList tags={recipe.tags} />
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
