const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js');

const {
  getPersonalRecipes,
  getRecipes,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} = require('../controllers/recipeController');

// GET all Recipes and Get and Create a Recipe
router.route('/').get(getRecipes).post(auth, createRecipe);

router.route('/my').get(auth, getPersonalRecipes);

// Get, Update and Delete a Recipe by ID
router
  .route('/:id')
  .get(getRecipe)
  .delete(auth, deleteRecipe)
  .patch(auth, updateRecipe);

module.exports = router;
