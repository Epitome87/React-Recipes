const express = require('express');
const auth = require('../middleware/auth.js');
const router = express.Router();
const {
  updateFavoriteMeals,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  login,
  logout,
  logoutAll,
} = require('../controllers/userController');

// GET all Users and Get and Create a User
router.route('/').post(createUser);

// Get, Update and Delete a User (self)
router
  .route('/me')
  .get(auth, getUser)
  .delete(auth, deleteUser)
  .patch(auth, updateUser);

// Routes for logging in and out
router
  .patch('/:id', updateFavoriteMeals)
  .get('/:id', getUser) // TODO: Remove this eventually
  .post('/login', auth, login)
  .post('/logout', auth, logout)
  .post('/logoutAll', auth, logoutAll);

module.exports = router;
