import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  prepTime: {
    type: String
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard']
  },
  calories: {
    type: String
  },
  tags: [{
    type: String
  }],
  ingredients: [{
    type: String,
    required: true
  }],
  instructions: [{
    type: String,
    required: true
  }],
  tips: [{
    type: String
  }],
  generatedFrom: [{
    type: String
  }],
  isSaved: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for faster queries
recipeSchema.index({ userId: 1, createdAt: -1 });
recipeSchema.index({ userId: 1, isSaved: 1 });

const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;

