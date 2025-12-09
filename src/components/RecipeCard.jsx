import { useState } from "react";
import {
  Card,
  OverlayTrigger,
  Tooltip,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import { HiMiniChartBar } from "react-icons/hi2";
import { IoTime } from "react-icons/io5";
import { FaFire } from "react-icons/fa";
import RecipeModal from "./RecipeModal";
import { recipeAPI } from "../services/api";
import { useAuth } from "../context/AuthContext";

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

export default function RecipeCard({
  recipe,
  onSaveSuccess,
  onUnsaveSuccess,
  showSavedByInfo,
}) {
  const [showModal, setShowModal] = useState(false);
  const [isSaved, setIsSaved] = useState(!!recipe.isSaved);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("success");
  const { isAuthenticated } = useAuth();

  const showNotification = (message, variant = "success") => {
    setToastMessage(message);
    setToastVariant(variant);
    setShowToast(true);
  };

  const handleSave = async (e) => {
    e.stopPropagation();
    if (loading) return;

    if (!isAuthenticated) {
      showNotification("Please login to save recipes", "warning");
      return;
    }

    if (!isSaved) {
      setLoading(true);
      try {
        await recipeAPI.saveRecipe(recipe);
        setIsSaved(true);
        showNotification("Recipe saved successfully!");
        onSaveSuccess?.();
      } catch (err) {
        console.error("Error saving recipe:", err);
        showNotification(err.message || "Failed to save recipe", "danger");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleUnsave = async (e) => {
    e.stopPropagation();
    if (loading) return;

    if (isSaved) {
      setLoading(true);
      try {
        await recipeAPI.deleteRecipe(recipe.id);
        setIsSaved(false);
        showNotification("Recipe removed from My Recipes");
        onUnsaveSuccess?.();
      } catch (err) {
        console.error("Error removing recipe:", err);
        showNotification(err.message || "Failed to remove recipe", "danger");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCardClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const renderSavedByInfo = () => {
    if (!showSavedByInfo || !recipe.savedByCount) return null;

    const count = recipe.savedByCount;
    const users = recipe.savedByUsers || [];

    return (
      <div
        className="text-muted mt-3 pt-3"
        style={{
          fontSize: "0.85rem",
          borderTop: "1px solid #e9ecef",
        }}
      >
        <span style={{ fontWeight: 500 }}>
          Saved by {count} {count === 1 ? "user" : "users"}
        </span>
        {users.length > 0 && (
          <>
            : {users.join(", ")}
            {count > 3 && " & more"}
          </>
        )}
      </div>
    );
  };

  return (
    <>
      <ToastContainer
        position="top-end"
        className="p-3"
        style={{ position: "fixed", zIndex: 9999 }}
      >
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={3000}
          autohide
          bg={toastVariant}
        >
          <Toast.Body className="text-white">{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>

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
                  cursor: loading ? "wait" : "pointer",
                  fontSize: "28px",
                  color: "var(--color-primary)",
                  lineHeight: 0,
                  opacity: loading ? 0.6 : 1,
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
          {renderSavedByInfo()}
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
