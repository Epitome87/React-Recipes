import axios from 'axios';

const API_KEY = process.env.REACT_APP_SPOON_API;

export async function getRandomRecipe(params) {
  try {
    const response = await axios.get(`https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}`, {
      params: params,
    });
    return response.data;
  } catch (error) {
    console.log('Error fetching recipe: ', error);
  }
}

export async function getRecipe(params) {
  try {
    const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}`, {
      params: params,
    });
    return response.data;
  } catch (error) {
    console.log('Error fetching recipe: ', error);
  }
}

export async function getRecipeById(recipeId) {
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=false&apiKey=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    console.log('Error fetching recipe: ', error);
  }
}
