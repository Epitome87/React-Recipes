// File to store some mock development data that we can reference easily across multiple files

// Mock categories (though we probably will use some variation of this in final product)
export const CATEGORIES = [
  { id: 1, text: 'breakfast', icon: '🍰' },
  { id: 2, text: 'main course', icon: '🍗' },
  { id: 3, text: 'dessert', icon: '🍰' },
  { id: 4, text: 'salad', icon: '🥬' },
  { id: 5, text: 'soup', icon: '🥣' },
  { id: 6, text: 'side dish', icon: '🤷‍♂️' },
  { id: 7, text: 'appetizer', icon: '🤷‍♂️' },
  { id: 8, text: 'beverage', icon: '🍺' },
  { id: 9, text: 'snack', icon: '🤷‍♂️' },
  { id: 10, text: 'drink', icon: '🍹' },
  { id: 11, text: 'fingerfood', icon: '🤷‍♂️' },
  { id: 12, text: 'bread', icon: '🍞' },
  { id: 13, text: 'sauce', icon: '🤷‍♂️' },
  { id: 14, text: 'marinade', icon: '🤷‍♂️' },
];

// Mock meal
export const meal = {
  id: 1,
  title: 'Placeholder Burger & Fries',
  image:
    'https://images2.minutemediacdn.com/image/upload/c_crop,h_1126,w_2000,x_0,y_181/f_auto,q_auto,w_1100/v1554932288/shape/mentalfloss/12531-istock-637790866.jpg',
  difficulty: 2.4,
  readyInMinutes: 35,
  rating: 3.8,
};

// Mock Meal Results List
export const results = [
  {
    id: 1,
    title: 'Placeholder Cheese Pizza',
    image:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    difficulty: 3.7,
    readyInMinutes: 55,
    rating: 4.8,
  },
  {
    id: 2,
    title: 'Placeholder Burger & Fries',
    image:
      'https://images2.minutemediacdn.com/image/upload/c_crop,h_1126,w_2000,x_0,y_181/f_auto,q_auto,w_1100/v1554932288/shape/mentalfloss/12531-istock-637790866.jpg',
    difficulty: 3,
    readyInMinutes: 40,
    rating: 4.5,
  },
  {
    id: 3,
    title: 'Placeholder Some Fancy Icecream Thingy',
    image:
      'https://images.unsplash.com/photo-1598268121084-c8f7126e0cef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    difficulty: 4.2,
    readyInMinutes: 40,
    rating: 4.1,
  },
  {
    id: 4,
    title: 'Placeholder Gross Healthy Salad',
    image:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    difficulty: 1.1,
    readyInMinutes: 10,
    rating: 1.2,
  },
];

// Mock users list
export const users = [
  {
    _id: 1,
    name: 'Caitlin',
    image:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80',
    favoriteMeals: [results[0], results[1], results[2]],
  },
  {
    _id: 2,
    name: 'Daniel',
    image:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80',
    favoriteMeals: [results[0], results[1]],
  },
  {
    _id: '62462cc3dec095aaf6d10dbc',
    name: 'Matt',
    image:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80',
    favoriteMeals: [results[0], results[2]],
  },
];
