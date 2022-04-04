const Recipe = require('../models/recipeModel');
const asyncHandler = require('express-async-handler');

const getPersonalRecipes = asyncHandler(async (req, res) => {
  // One way to get recipes by this user
  const recipesByUser = await Recipe.find({ author: req.user._id });
  // Another way:
  // await req.user.populate('recipes');

  res.status(200).json(recipesByUser);
  // res.status(200).json(req.user.recipes);
});

// @desc Get Recipes
// @route GET /api/recipes
// @access Private
const getRecipes = asyncHandler(async (req, res) => {
  const recipes = await Recipe.find({});
  res.status(200).json(recipes);
});

// @desc Get Recipe
// @route GET /api/recipes/:id
// @access Private
const getRecipe = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);

  // This works!!! But we probably don't want to expose all the author's info here!
  await recipe.populate('author');
  console.log('AUTHOR', recipe.author);

  res.status(200).json(recipe);
});

// @desc Set recipe
// @route POST /api/recipes
// @access Private
const createRecipe = asyncHandler(async (req, res) => {
  console.log('CREATING RECIPE');
  if (!req.body) {
    res.status(400);
    throw new Error('Please provide appropriate recipe information');
  }

  const { title, image, timeToPrep, difficulty, rating } = req.body;
  const author = req.user._id;

  const recipe = await Recipe.create({
    title,
    image,
    timeToPrep,
    difficulty,
    rating: 3,
    author,
  });
  res.status(200).json(recipe);
});

// @desc Update Recipe
// @route PUT /api/recipes/:id
// @access Private
const updateRecipe = asyncHandler(async (req, res) => {
  const { id: recipeId } = req.params;

  const recipe = await Recipe.findById(recipeId);

  // No recipe with this ID
  if (!recipe) {
    res.status(400);
    throw new Error('Recipe not found');
  }

  // Does this recipe belong to someone?
  if (recipe.author && recipe.author !== req.user_id) {
    // If this recipe has an author, and it is not this user, do not allow it to be PATCHed
    res.status(400);
    throw new Error('You do not have permission to edit this Recipe');
  }

  // Pass in options with key of "new" set to true -- so we create the document if it does not exist
  const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, req.body, {
    new: true,
  });

  res.status(200).json(updatedRecipe);
});

// @desc Delete Recipe ser
// @route DELETE /api/recipes/:id
// @access Private
const deleteRecipe = asyncHandler(async (req, res) => {
  const { id: recipeId } = req.params;

  const recipe = await Recipe.findById(recipeId);

  if (!recipe) {
    res.status(400);
    throw new Error('Recipe not found');
  }

  await recipe.remove();

  res.status(200).json({ id: recipeId });
});

module.exports = {
  getPersonalRecipes,
  getRecipes,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
