import React, { Fragment, useEffect, useState } from 'react';
import {
  Heading,
  Flex,
  Link,
  Spacer,
  Stack,
  VStack,
  HStack,
} from '@chakra-ui/react';
import { Link as ReactLink } from 'react-router-dom';
import CategoryButton from './Button/Button';
import { getRecipe } from '../../../api/recipeSearch';
import * as mealHelper from '../../../utils/meal';
import MealPreview from '../Preview/Preview';
import { CATEGORIES } from '../../../utils/mockData';
import { recipeService } from '../../../api/recipes.service';
import { useFetch } from '../../../utils/hooks/useFetch';
import axios from 'axios';

const DEFAULT_CATEGORY = mealHelper.recommendedMealCategory();

function MealCategories() {
  const [selectedCategory, setSelectedCategory] = useState(DEFAULT_CATEGORY);
  const [categoryCount, setCategoryCount] = useState(6);

  //   Using non-useFetch, grabbing placeholder meals from our database
  const [suggestedRecipes, setSuggestedRecipes] = useState([]);

  //   Using useFetch, grabbing placeholder meals from our database
  //   const [suggestedRecipes, isLoading, error] = useFetch(
  //     recipeService.getFromServer()
  //   );

  useEffect(() => {
    const fetchMealsFromCategory = async () => {
      const params = {};
      params.type = CATEGORIES[selectedCategory - 1].text.replace(' ', '');
      // const fetchedRecipes = await getRecipe(params);
      let fetchedRecipes = null;

      try {
        const response = await axios.get(`http://localhost:5000/api/recipes`);
        fetchedRecipes = response.data;
      } catch (error) {
        console.log('Error fetching recipes: ', error);
      }

      // TODO: How do we re-fetch when category chagnes using useFetch?
      setSuggestedRecipes(fetchedRecipes);
    };

    fetchMealsFromCategory();
  }, [selectedCategory]);

  const handleCategoriesOnClick = (event) => {
    // We're already viewing a lot of Categories -- let's collapse some!
    if (categoryCount > 6) {
      setCategoryCount(6);
    } else {
      // We're not viewing very many Categories -- let's expand them!
      setCategoryCount(CATEGORIES.length);
    }
  };

  const renderedSuggestionList = () => {
    if (!suggestedRecipes) return;

    return suggestedRecipes.map((recipe) => {
      // We should use recipe.id if we are fetching from Spoonacular
      return <MealPreview key={recipe._id} recipe={recipe} />;
    });
  };

  return (
    <Fragment>
      <Flex align="end" mt="10" mb="5">
        <Heading as="h2" size="lg">
          Meal Category
        </Heading>
        <Spacer />
        <Link
          as={ReactLink}
          to="#"
          _hover={{ color: 'testYellow' }}
          onClick={handleCategoriesOnClick}
        >
          {categoryCount > 6 ? 'Show Less' : 'Show All'}
        </Link>
      </Flex>
      <Flex
        direction="row"
        flexWrap="wrap"
        justifyContent="center"
        gap={6}
        mb="1rem"
      >
        {CATEGORIES.slice(0, categoryCount).map((category) => (
          <CategoryButton
            key={category.text}
            onClickHandler={setSelectedCategory}
            isSelected={category.id === selectedCategory}
            category={category}
          />
        ))}
      </Flex>
      <Flex
        justifyContent="space-around"
        direction="row"
        align="center"
        flexWrap="wrap"
        gap={2}
        pb="2rem"
      >
        {renderedSuggestionList()}
      </Flex>
    </Fragment>
  );
}

export default MealCategories;
