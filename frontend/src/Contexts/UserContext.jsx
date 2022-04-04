import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
  user: {
    isLoggedIn: false,
    _id: 0,
    name: 'Matthew',
    image: '',
    favoriteMeals: [],
  },
};

const actions = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  ADD_FAVORITE: 'ADD_FAVORITE',
};

const userReducer = (state, action) => {
  switch (action.type) {
    case actions.LOGOUT:
      return initialState;
    case actions.LOGIN:
      console.log('ACTION', action);
      return {
        user: {
          isLoggedIn: true,
          _id: action.user._id,
          name: action.user.name,
          image: action.user.image,
          favoriteMeals: action.user.favoriteMeals,
        },
      };
    case actions.ADD_FAVORITE:
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

function UserProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const value = {
    user: state.user,
    login: (user) => {
      dispatch({ type: actions.LOGIN, user });
    },
    logout: () => {
      dispatch({ type: actions.LOGOUT });
    },
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

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
