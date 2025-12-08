import User from '../models/User.js';

/**
 * Get user preferences
 * GET /api/preferences
 */
export const getPreferences = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.json({
      success: true,
      data: user.preferences
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Update user preferences
 * PUT /api/preferences
 */
export const updatePreferences = async (req, res) => {
  try {
    const { complexity, spice, dietary, cuisine, meal } = req.body;

    const user = await User.findById(req.user.id);

    // Update preferences
    user.preferences = {
      complexity: complexity || [],
      spice: spice || [],
      dietary: dietary || [],
      cuisine: cuisine || [],
      meal: meal || []
    };

    await user.save();

    res.json({
      success: true,
      data: user.preferences
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Reset preferences to default
 * POST /api/preferences/reset
 */
export const resetPreferences = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    user.preferences = {
      complexity: [],
      spice: [],
      dietary: [],
      cuisine: [],
      meal: []
    };

    await user.save();

    res.json({
      success: true,
      data: user.preferences,
      message: 'Preferences reset successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

