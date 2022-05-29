import React, { createContext, useContext, useReducer } from 'react';
import { IMeal, IUser } from '../types/types';

type State = {
  user: IUser;
};

const initialState = {
  user: {
    isLoggedIn: false,
    _id: '0',
    name: 'Matthew',
    image: '',
    favoriteMeals: [
      {
        _id: '1',
        title: 'Placeholder Burger & Fries',
        image:
          'https://images2.minutemediacdn.com/image/upload/c_crop,h_1126,w_2000,x_0,y_181/f_auto,q_auto,w_1100/v1554932288/shape/mentalfloss/12531-istock-637790866.jpg',
        difficulty: 2.4,
        readyInMinutes: 35,
        rating: 3.8,
      },
    ],
  },
};

// const actions = {
//   LOGIN: 'LOGIN',
//   LOGOUT: 'LOGOUT',
//   ADD_FAVORITE: 'ADD_FAVORITE',
// };

type Action = { type: 'LOGIN'; user: IUser } | { type: 'LOGOUT' } | { type: 'ADD_FAVORITE'; meal: IMeal };

const userReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'LOGOUT':
      return initialState;

    case 'LOGIN':
      return {
        user: {
          isLoggedIn: true,
          _id: action.user?._id,
          name: action.user?.name,
          image: action.user?.image,
          favoriteMeals: action.user?.favoriteMeals,
        },
      };

    case 'ADD_FAVORITE':
      return {
        user: {
          ...state.user,
          favoriteMeals: [...state.user.favoriteMeals, action.meal],
        },
      };

    default:
      return state;
  }
};

const UserContext = createContext(initialState);

const UserProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const value = {
    user: state.user,
    login: (user: IUser) => {
      dispatch({ type: 'LOGIN', user });
    },
    logout: () => {
      dispatch({ type: 'LOGOUT' });
    },
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// In consuming files, rather than do import UserContext from './UserContext.jsx', and const user = React.useContext(UserContext), we can do this:
// import { useUser } from './UserContext.jsx' and const use = useUser()
function useUser() {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider!');
  }

  return context;
}

// We want the default export to be the context itself
export default UserContext;

// But we also want to export the Component that wraps UserContext.Provider
export { UserProvider, useUser };
