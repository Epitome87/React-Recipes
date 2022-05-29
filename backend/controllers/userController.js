const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');

// @desc Get Users
// @route GET /api/users
// @access Private
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});

// @desc Get User
// @route GET /api/users/:id
// @access Private
// const getUser = asyncHandler(async (req, res) => {
//   // const user = await User.findById(req.params.id).populate('favoriteMeals');
//   // User must already be found via our Auth middleware if we reach this point
//   console.log('GTEETTING USER');
//   res.status(200).json({
//     user: req.user,
//     favoriteMeals: await req.user.populate('favoriteMeals'),
//   });
// });
// TODO:
const getUser = asyncHandler(async (req, res) => {
  console.log(req.params.id);
  const user = await User.findById(req.params.id).populate('favoriteMeals');
  // User must already be found via our Auth middleware if we reach this point
  console.log('GTEETTING USER', user);
  // res.status(200).json({
  //   user: req.user,
  //   favoriteMeals: await req.user.populate('favoriteMeals'),
  // });
  res.status(200).json({
    user,
    // favoriteMeals: await user.populate('favoriteMeals'),
  });
});

// TODO:
const updateFavoriteMeals = asyncHandler(async (req, res) => {
  // Body will have isFavorite boolean and mealID set to the ObjectID of the meal in question
  const { isFavorite, mealID } = req.body;
  console.log(
    `Updating User ${req.params.id} for meal ${mealID} setting it to Favorite=${isFavorite}`
  );

  const user = await User.findById(req.params.id);

  // If this meal isn't a Favorite, make sure it's not in favoriteMeals list
  // user.favoriteMeals.forEach((meal) => console.log('ID', meal._id.toString()));
  // We need to store a meal with a separate ID from the ones Mongo gives us -- needs to match their Spoonacular ID
  if (!isFavorite) {
    user.favoriteSpoonacularMeals = user.favoriteSpoonacularMeals.filter(
      // (meal) => meal._id.toString() !== mealID
      (meal) =>  meal !== mealID
    );

    await user.save();
    return res.status(200).json({ user });
  }

  // But if the Meal is to be a Favorite, add it!
  if (user.favoriteSpoonacularMeals.some((meal) => meal === mealID)) {
    // Meal is already in favorite list!
    return res.status(200).json({ user });
  } else {
    user.favoriteSpoonacularMeals.push(mealID);
    await user.save();
    res.status(200).json({ user });
  }
});

// @desc Set user
// @route POST /api/users
// @access Private
const createUser = asyncHandler(async (req, res) => {
  if (!req.body) {
    res.status(400);
    throw new Error('Please provide appropriate user information');
  }

  const { email, password, name, image, favoriteMeals } = req.body;
  const user = new User({ email, password, name, image, favoriteMeals });
  await user.save();

  const token = await user.generateAuthToken();

  res.status(201).json({ user, token });
});

// @desc Update User
// @route PUT /api/users/:id
// @access Private
const updateUser = asyncHandler(async (req, res) => {
  // User can only update himself, so we don't need to specify an ID -- we grab the currently auth'd user's ID
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(400);
    throw new Error('User not found');
  }

  // Pass in options with key of "new" set to true -- so we create the document if it does not exist
  const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
  });

  res.status(200).json(updatedUser);
});

// @desc Delete User
// @route DELETE /api/users/me
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
  // User can only delete himself, so we don't need to specify an ID -- we grab the currently auth'd user's ID
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(400);
    throw new Error('User not found');
  }

  await user.remove();

  res.status(200).json({ id: req.user._id });
});

// Log the user in given their email / password
const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findByCredentials(email, password);
  const token = await user.generateAuthToken();

  res.status(200).send({ user, token });
};

// Logout by clearing the User's current Token
const logout = async (req, res) => {
  req.user.tokens = req.user.tokens.filter((token) => token !== req.token);
  await req.user.save();
  res.status(200).send();
};

// Logout by clearing all of the User's Tokens
const logoutAll = async (req, res) => {
  req.user.tokens = [];

  await req.user.save();
  res.status(200).send();
};

module.exports = {
  updateFavoriteMeals,
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  login,
  logout,
  logoutAll,
};
