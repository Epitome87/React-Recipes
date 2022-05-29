import React from 'react';
import { Container, Heading, Stack, Text } from '@chakra-ui/react';
import { MealPreview, MealPreviewSkeleton } from '../Components/Meal';
import { recipeService } from '../api/recipes.service';
import { useFetch } from '../utils/hooks/useFetch';
import { IRecipe } from '../types/types';

const ScreenRecipes: React.FC = () => {
  const [recipes, isLoading, error] = useFetch(recipeService.getFromServer());

  if (error) {
    return (
      <Container maxW='container.xl' centerContent minH='93vh' bg='primary'>
        <Text>Error fetching Recipes from our server's database!</Text>
      </Container>
    );
  }

  // TODO: Temporary, sloppy way of testing Skeletons
  const tempArray: IRecipe[] = [
    {
      _id: 't1',
      title: 'Loading Meal',
      difficulty: 3,
      rating: 3,
      readyInMinutes: 60,
      image: '',
    },
    {
      _id: 't2',
      title: 'Loading Meal',
      difficulty: 3,
      rating: 3,
      readyInMinutes: 60,
      image: '',
    },
    {
      _id: 't3',
      title: 'Loading Meal',
      difficulty: 3,
      rating: 3,
      readyInMinutes: 60,
      image: '',
    },
    // {
    //   _id: 't4',
    //   title: 'Loading Meal',
    //   difficulty: 3,
    //   rating: 3,
    //   readyInMinutes: 60,
    //   image: '',
    // },
  ];

  return (
    <Container maxW='container.xl' centerContent minH='93vh' bg='primary'>
      {/* <Heading as="h1" color="testYellow" my={4} textDecoration="underline">
        Here are some Recipes!
      </Heading> */}
      <Text>They are being fetched from MongoDB on localhost:5000!</Text>
      <Stack justifyContent='space-around' spacing={4} direction='row' align='center' flexWrap='wrap' gap={2} mt={20}>
        {isLoading &&
          tempArray.map((recipe: IRecipe) => {
            return <MealPreviewSkeleton key={recipe._id} recipe={recipe} isLoading={true} />;
          })}
        {recipes &&
          recipes.map((recipe: IRecipe) => {
            return (
              <MealPreview
                key={recipe._id}
                recipe={recipe}
                // TODO: Why was I passing this? It's never used, is it?
                // isLoading={isLoading}
              />
            );
          })}
      </Stack>
    </Container>
  );
};

export default ScreenRecipes;
