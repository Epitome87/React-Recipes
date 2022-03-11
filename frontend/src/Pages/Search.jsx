import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import useFetch from '../utils/hooks/useFetch';
import { recipeService } from '../api/recipes.service';
import { Container, Heading, Input, Stack } from '@chakra-ui/react';
import { MealPreview } from '../Components/Meal';

function ScreenSearch() {
  const { query } = useParams();

  // TODO: The URL returned by getRecipesByParams contains the data in a "results" object. How do we access that with useFetch?
  // IDEA: Maybe our useFetch accepts a "transformData" function -- a function which lets us manipulat the data in some way.
  // const [searchedRcipes, isLoading, hasError] = useFetch(
  //   recipeService.getRecipesByParams({ query: query, number: 10 })
  // );

  // Stores the Recipes returned by Spoonacular
  const [searchedRecipes, setSearchedRecipes] = useState([]);

  // This is the text the user sees in the input field
  const [searchTerm, setSearchTerm] = useState('hamburger');

  // A "debounced" value for the search. This value is only set when the user hits Enter
  // This allows us to not make API calls every keystroke (if we were to use searchTerm above)
  // It also allows us to take the quer in the URL as our initial search term value
  const [searchQuery, setSearchQuery] = useState(query);

  const fetchRecipeByQuery = async (recipeName) => {
    const fetchedData = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_SPOON_API}&query=${searchQuery}&number=5`
    );

    const fetchedRecipes = fetchedData.data;
    setSearchedRecipes(fetchedRecipes.results);
  };

  // Re-fetch every time the query param changes
  useEffect(() => {
    console.log('Fetching for search query', searchQuery);
    fetchRecipeByQuery(searchQuery);
  }, [searchQuery]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchQuery(searchTerm);
  };

  if (!searchedRecipes) return <div>Fetching {query} recipes...</div>;

  return (
    <Container maxW="container.xl" centerContent minH="93vh" bg="primary">
      <Heading as="h1" color="testYellow" my={4} textDecoration="underline">
        Search Results Screen
      </Heading>
      <form onSubmit={handleSubmit}>
        <Input
          variant="filled"
          placeholder="Hamburger"
          value={searchTerm}
          onChange={handleInputChange}
        />
      </form>

      <Stack
        justifyContent="space-around"
        spacing={4}
        direction="row"
        align="center"
        flexWrap="wrap"
        gap={2}
        mt={20}
      >
        {searchedRecipes.map((recipe) => {
          return <MealPreview key={recipe._id} recipe={recipe} />;
        })}
      </Stack>
    </Container>
  );
}

export default ScreenSearch;
