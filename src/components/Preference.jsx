import { useState } from "react";
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
  preferenceCategories,
} from "../utils/preferences";
import FilterGroup from "./FilterGroup";

export default function Preference() {
  const [preferences, setPreferences] = useState(getUserPreferences);
  const [saveStatus, setSaveStatus] = useState(""); // 'success' or 'error'

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
      handleAlert("success");
    } else {
      handleAlert("error");
    }
  };

  const handleReset = () => {
    const success = resetPreferences();
    if (success) {
      const defaultPrefs = getUserPreferences();
      setPreferences(defaultPrefs);
      handleAlert("success");
    } else {
      handleAlert("error");
    }
  };

  const handleAlert = (status) => {
    setSaveStatus(status);
    setTimeout(() => setSaveStatus(""), 3000);
  };

  return (
    <Container className="fluid p-4">
      {/* <h5 className="section-heading mb-4">Preferences</h5> */}
      <Row className="my-2 my-md-4 text-center">
        <p className="lead" style={{ color: "var(--color-warm-brown)" }}>
          Customize your recipe recommendations 🪄
        </p>
      </Row>

      <Card className="mb-4">
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
    </Container>
  );
}
