export interface IRecipe {
  _id: string;
  id?: string;
  title: string;
  image: string;
  difficulty: number;
  readyInMinutes: number;
  rating: number;
}

export interface IUser {
  isLoggedIn: boolean;
  _id: string;
  name: string;
  image: string;
  favoriteMeals: IMeal[];
}

export interface IMeal {
  _id: string;
  id?: string;
  title: string;
  image: string;
  difficulty: number;
  readyInMinutes: number;
  rating: number;
}
