import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import {
  getUserPreferences,
  saveUserPreferences,
  resetPreferences,
} from "../utils/preferences";
import FilterGroup from "./FilterGroup";

export default function Preference() {
  const [preferences, setPreferences] = useState({
    dietaryRestrictions: [],
    cuisineStyle: [],
    mealType: [],
    cookingComplexity: [],
    spiceLevel: [],
  });
  const [saveStatus, setSaveStatus] = useState(""); // 'success' or 'error'

  // Load preferences from localStorage on mount
  useEffect(() => {
    const saved = getUserPreferences();
    setPreferences(saved);
  }, []);

  const handleCheckboxChange = (category, value) => {
    setPreferences((prev) => {
      const currentArray = prev[category] || [];
      const isSelected = currentArray.includes(value);

      return {
        ...prev,
        [category]: isSelected
          ? currentArray.filter((item) => item !== value)
          : [...currentArray, value],
      };
    });
  };

  const handleSave = () => {
    const success = saveUserPreferences(preferences);
    if (success) {
      setSaveStatus("success");
      setTimeout(() => setSaveStatus(""), 3000);
    } else {
      setSaveStatus("error");
      setTimeout(() => setSaveStatus(""), 3000);
    }
  };

  const handleReset = () => {
    if (resetPreferences()) {
      const defaultPrefs = getUserPreferences();
      setPreferences(defaultPrefs);
      setSaveStatus("success");
      setTimeout(() => setSaveStatus(""), 3000);
    } else {
      setSaveStatus("error");
      setTimeout(() => setSaveStatus(""), 3000);
    }
  };

  const preferenceCategories = [
    {
      key: "complexity",
      label: "Cooking Complexity",
      icon: "⏱️",
      options: ["Easy", "Medium", "Hard"],
    },
    {
      key: "spice",
      label: "Spice Level",
      icon: "🌶️",
      options: ["Mild", "Medium", "Hot"],
    },
    {
      key: "dietary",
      label: "Dietary Restrictions",
      icon: "🥗",
      options: [
        "Vegan",
        "Vegetarian",
        "Gluten-Free",
        "Dairy-Free",
        "Nut-Free",
        "Keto",
        "Paleo",
        "Low-Carb",
      ],
    },
    {
      key: "cuisine",
      label: "Cuisine Style",
      icon: "🌍",
      options: [
        "Asian",
        "Italian",
        "Mexican",
        "Mediterranean",
        "American",
        "Indian",
        "French",
        "Japanese",
        "Thai",
        "Chinese",
      ],
    },
    {
      key: "meal",
      label: "Meal Type",
      icon: "🍽️",
      options: ["Breakfast", "Lunch", "Dinner", "Snack", "Dessert"],
    },
  ];

  return (
    <Container className="mt-5">
      <Row>
        <Col md={10} className="mx-auto">
          <div className="text-center mb-5">
            {/* <h1 className="hero-title display-4 mb-3">Preferences</h1> */}
            <p className="lead" style={{ color: "var(--color-warm-brown)" }}>
              Customize your recipe recommendations 🪄
            </p>
          </div>

          <Card className="mb-4">
            <Card.Body className="p-5">
              <Form>
                {preferenceCategories.map((category) => (
                  <FilterGroup
                    key={category.key}
                    category={category.key}
                    label={category.label}
                    icon={category.icon}
                    options={category.options}
                    selectedValues={preferences[category.key] || []}
                    onChange={handleCheckboxChange}
                  />
                ))}
              </Form>

              <div className="d-flex gap-3 justify-content-end mt-4">
                <Button variant="outline-secondary" onClick={handleReset}>
                  Reset to Default
                </Button>
                <Button variant="primary" onClick={handleSave}>
                  Save Preferences
                </Button>
              </div>

              {saveStatus === "success" && (
                <Alert variant="success" className="mt-4">
                  Preferences saved successfully!
                </Alert>
              )}
              {saveStatus === "error" && (
                <Alert variant="danger" className="mt-4">
                  Error saving preferences. Please try again.
                </Alert>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
