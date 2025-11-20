const STORAGE_KEY = 'savedRecipes';

// Get all saved recipes from localStorage
export const getSavedRecipes = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return [];
  }
};

// Save a recipe to localStorage
export const saveRecipe = (recipe) => {
  try {
    const saved = getSavedRecipes();
    // Check if recipe already exists (by id)
    const exists = saved.some((r) => r.id === recipe.id);
    if (!exists) {
      saved.push(recipe);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
    }
    return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
};

// Remove a recipe from localStorage
export const removeRecipe = (recipeId) => {
  try {
    const saved = getSavedRecipes();
    const filtered = saved.filter((r) => r.id !== recipeId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error removing from localStorage:', error);
    return false;
  }
};

// Check if a recipe is saved
export const isRecipeSaved = (recipeId) => {
  const saved = getSavedRecipes();
  return saved.some((r) => r.id === recipeId);
};

