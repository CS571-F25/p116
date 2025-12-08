import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";
import {
  getUserPreferences,
  saveUserPreferences,
  preferenceCategories,
} from "../utils/preferences";
import { preferencesAPI } from "../services/api";
import FilterGroup from "./FilterGroup";

export default function Preference() {
  const [preferences, setPreferences] = useState(getUserPreferences);
  const [saveStatus, setSaveStatus] = useState(""); // 'success' or 'error'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    try {
      const apiPrefs = await preferencesAPI.getPreferences();
      setPreferences(apiPrefs);
      // Also save to localStorage for offline access
      saveUserPreferences(apiPrefs);
    } catch (err) {
      console.error("Error loading preferences:", err);
      // Fall back to localStorage if API fails
      const localPrefs = getUserPreferences();
      setPreferences(localPrefs);
    } finally {
      setLoading(false);
    }
  };

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

  const handleSave = async () => {
    try {
      await preferencesAPI.updatePreferences(preferences);
      saveUserPreferences(preferences); // Also save to localStorage
      handleAlert("success");
    } catch (err) {
      console.error("Error saving preferences:", err);
      handleAlert("error");
    }
  };

  const handleReset = async () => {
    try {
      const defaultPrefs = await preferencesAPI.resetPreferences();
      setPreferences(defaultPrefs);
      saveUserPreferences(defaultPrefs); // Also save to localStorage
      handleAlert("success");
    } catch (err) {
      console.error("Error resetting preferences:", err);
      handleAlert("error");
    }
  };

  const handleAlert = (status) => {
    setSaveStatus(status);
    setTimeout(() => setSaveStatus(""), 3000);
  };

  if (loading) {
    return (
      <Container className="p-4 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="fluid p-4">
      {/* <h5 className="section-heading mb-4">Preferences</h5> */}
      <Row className="my-2 my-md-4 text-center">
        <p className="lead" style={{ color: "var(--color-warm-brown)" }}>
          Customize your recipe recommendations 🪄
        </p>
      </Row>

      <Card className="mb-4 mx-auto">
        <Card.Body className="p-4 p-md-5">
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
              Reset
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
    </Container>
  );
}
