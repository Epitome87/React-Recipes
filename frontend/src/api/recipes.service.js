//I implemented this fetchWrapper helper function for every case of request.
//Maybe than we don't need additional axios library?
import { fetchWrapper } from '../utils/fetchWrapper';
const API_KEY = process.env.REACT_APP_SPOON_API;
const BASE_API_URL = `https://api.spoonacular.com/recipes/`;

//I' made this service so i don't mess with code what matt did, if this is not a good approach

export const recipeService = {
  getFromServer,
  getByIdFromServer,
  getRandom,
  getById,
  getByMealType,
  create,
  getRecipesByParams,
};

// Get ALL recipes from our own server's database!
function getFromServer() {
  return `http://localhost:5000/api/recipes`;
}

// Get a recipe by its ID from our own server's database!
function getByIdFromServer(id) {
  return `http://localhost:5000/api/recipes/${id}`;
}

function getRecipesByParams(params) {
  let url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}`;

  // Convert the params object to its URL equivalent -- append this to base URL.
  url += '&' + new URLSearchParams(params).toString();

  return url;
}

// Get a random recipe
function getRandom(count = 1) {
  return fetchWrapper.get(`${BASE_API_URL}random?number=${count}&apiKey=${API_KEY}`);
}

function getById(id) {
  // return fetchWrapper.get(
  //   `${BASE_API_URL}${id}/information?includeNutrition=false&apiKey=${API_KEY}`
  // );

  return `${BASE_API_URL}${id}/information?includeNutrition=false&apiKey=${API_KEY}`;
}

function getByMealType(mealType) {
  //TODO
}

function create(params) {
  //TODO
  return fetchWrapper.post(BASE_API_URL, params);
}
