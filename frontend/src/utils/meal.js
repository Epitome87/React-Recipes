// General helper file for anything closelly related to a Meal

import * as timeHelper from './time';

// Helper that helps determine which Meal Category (ID) to default to, based on time of the time
export const recommendedMealCategory = () => {
  if (timeHelper.isBreakfastTime()) return 1;
  if (timeHelper.isLunchTime()) return 2;
  if (timeHelper.isDessertTime()) return 3;

  // If we can't find any scenario above, return the ID for Soup
  return 5;
};

// Helper that determines which greeting message to present to the user
export const greetingMessage = () => {
  if (timeHelper.isBreakfastTime()) return 'Get your day started with a nice breakfast!';
  if (timeHelper.isLunchTime()) return 'Ready to cook for dinner?';
  if (timeHelper.isDessertTime()) return 'Indulge in some dessert!';

  return 'Come explore our recipes!';
};

// Helper that determines which recommendation message to present to the user
export const recommendationMessage = () => {
  if (timeHelper.isBreakfastTime()) return 'Menu For Breakfast';
  if (timeHelper.isLunchTime()) return 'Menu For Lunch';
  if (timeHelper.isDessertTime()) return 'Menu For Dessert';

  return 'Menu For Any Time';
};
