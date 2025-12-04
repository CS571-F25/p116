const STORAGE_KEY = "userPreferences";

// Default preferences
const DEFAULT_PREFERENCES = {
  complexity: [],
  spice: [],
  dietary: [],
  cuisine: [],
  mealType: [],
};

// Get user preferences from localStorage
export const getUserPreferences = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : DEFAULT_PREFERENCES;
  } catch (error) {
    console.error("Error reading preferences from localStorage:", error);
    return DEFAULT_PREFERENCES;
  }
};

// Save user preferences to localStorage
export const saveUserPreferences = (preferences) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    return true;
  } catch (error) {
    console.error("Error saving preferences to localStorage:", error);
    return false;
  }
};

// Reset preferences to default
export const resetPreferences = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PREFERENCES));
    return true;
  } catch (error) {
    console.error("Error resetting preferences:", error);
    return false;
  }
};
