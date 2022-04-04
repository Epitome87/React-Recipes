import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import { UserContext, UserProvider } from './Contexts/UserContext';
const Navigation = lazy(() => import('./Components/Layout/Navigation'));
const Landing = lazy(() => import('./Pages/Home'));
const Search = lazy(() => import('./Pages/Search'));
const Recipe = lazy(() => import('./Pages/Recipe'));
const Recipes = lazy(() => import('./Pages/Recipes'));
const UserProfile = lazy(() => import('./Pages/UserProfile'));
const Error = lazy(() => import('./Pages/Error'));
// import Navigation from './Components/Layout/Navigation';
// import Landing from './Pages/Home';
// import Search from './Pages/Search';
// import Recipe from './Pages/Recipe';
// import Recipes from './Pages/Recipes';
// import UserProfile from './Pages/UserProfile';
// import Error from './Pages/Error';

function App() {
  return (
    <UserProvider>
      <Box maxW="1200px" bg="#28282B" h="100%" mx="auto">
        <Suspense fallback={<React.Fragment>Loading...</React.Fragment>}>
          <Router>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/search" element={<Search />} />
              <Route path="/search/:query" element={<Search />} />
              <Route path="/recipes" element={<Recipes />} />
              <Route path="/recipes/:recipeId" element={<Recipe />} />
              <Route path="/users/:userId" element={<UserProfile />} />
              <Route path="*" element={<Error />} />
            </Routes>
            <Navigation />
          </Router>
        </Suspense>
      </Box>
    </UserProvider>
  );
}

export default App;
