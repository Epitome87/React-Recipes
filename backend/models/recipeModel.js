const mongoose = require('mongoose');

// Defines the shape of a Recipe model
const recipeSchema = mongoose.Schema(
  {
    // The title of the recipe -- it is required!
    title: {
      type: String,
      required: [true, 'Please enter a recipe title'],
    },
    // The URL that stores the image that showcases the recipe
    image: {
      type: String,
      required: false,
    },
    // How long (in minutes) does this recipe take to prepare?
    readyInMinutes: {
      type: Number,
    },
    // How difficult (0 to 5) is it to complete the recipe?
    difficulty: {
      type: Number,
      min: 0,
      max: 5,
    },
    // The average rating of the recipe (0 to 5)
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Recipe', recipeSchema);
