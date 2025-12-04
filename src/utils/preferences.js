const STORAGE_KEY = "userPreferences";

// Default preferences
const DEFAULT_PREFERENCES = {
  complexity: [],
  spice: [],
  dietary: [],
  cuisine: [],
  mealType: [],
};

export const preferenceCategories = [
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
      "American",
      "Mexican",
      "Mediterranean",
      "Italian",
      "French",
      "Middle Eastern",
      "Chinese",
      "Japanese",
      "Indian",
      "Thai",
    ],
  },
  {
    key: "meal",
    label: "Meal Type",
    icon: "🍽️",
    options: ["Breakfast", "Lunch", "Dinner", "Snack", "Dessert"],
  },
];

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
