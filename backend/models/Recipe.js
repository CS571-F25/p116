import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    prepTime: {
      type: String,
    },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
    },
    calories: {
      type: String,
    },
    tags: [
      {
        type: String,
      },
    ],
    ingredients: [
      {
        type: String,
        required: true,
      },
    ],
    instructions: [
      {
        type: String,
        required: true,
      },
    ],
    tips: [
      {
        type: String,
      },
    ],
    generatedFrom: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Index for faster queries
recipeSchema.index({ title: 1 });
recipeSchema.index({ createdBy: 1, createdAt: -1 });

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;
