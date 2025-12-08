const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3001/api";

// Helper function to get auth token
const getToken = () => {
  return localStorage.getItem("authToken");
};

// Helper function to handle API responses
const handleResponse = async (response) => {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

// Helper function to make authenticated requests
const makeRequest = async (url, options = {}) => {
  const token = getToken();

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  });

  return handleResponse(response);
};

// Auth API
export const authAPI = {
  async register(email, password, name) {
    const data = await makeRequest("/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password, name }),
    });

    if (data.success && data.data.token) {
      localStorage.setItem("authToken", data.data.token);
      localStorage.setItem("user", JSON.stringify(data.data.user));
    }

    return data;
  },

  async login(email, password) {
    const data = await makeRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (data.success && data.data.token) {
      localStorage.setItem("authToken", data.data.token);
      localStorage.setItem("user", JSON.stringify(data.data.user));
    }

    return data;
  },

  logout() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  },

  async getMe() {
    return makeRequest("/auth/me");
  },

  isAuthenticated() {
    return !!getToken();
  },

  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  },
};

// Recipe API
export const recipeAPI = {
  async generateRecipes(ingredients, preferences) {
    const data = await makeRequest("/recipes/generate", {
      method: "POST",
      body: JSON.stringify({ ingredients, preferences }),
    });

    return data.data; // Return the recipes array
  },

  async getSavedRecipes() {
    const data = await makeRequest("/recipes/saved");
    return data.data;
  },

  async getAllRecipes() {
    const data = await makeRequest("/recipes");
    return data.data;
  },

  async getRecipe(recipeId) {
    const data = await makeRequest(`/recipes/${recipeId}`);
    return data.data;
  },

  async saveRecipe(recipe) {
    const data = await makeRequest("/recipes/save", {
      method: "POST",
      body: JSON.stringify(recipe),
    });

    return data.data;
  },

  async deleteRecipe(recipeId) {
    const data = await makeRequest(`/recipes/${recipeId}`, {
      method: "DELETE",
    });

    return data;
  },
};

// Preferences API
export const preferencesAPI = {
  async getPreferences() {
    const data = await makeRequest("/preferences");
    return data.data;
  },

  async updatePreferences(preferences) {
    const data = await makeRequest("/preferences", {
      method: "PUT",
      body: JSON.stringify(preferences),
    });

    return data.data;
  },

  async resetPreferences() {
    const data = await makeRequest("/preferences/reset", {
      method: "POST",
    });

    return data.data;
  },
};
