import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Button,
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Link,
  ListItem,
  OrderedList,
  Spinner,
  Stack,
  Text,
  useToast,
  ButtonGroup,
} from '@chakra-ui/react';
import {
  ClockCircleFilled,
  FireFilled,
  StarFilled,
  HeartFilled,
} from '@ant-design/icons';
import { recipeService } from '../api/recipes.service';
import { getRecipeById } from '../api/recipeSearch';
import useFetch from '../utils/hooks/useFetch';
import axios from 'axios';

function ScreenRecipe() {
  const { recipeId } = useParams();
  const [recipe, isLoading, error] = useFetch(
    //recipeService.getByIdFromServer(recipeId)
    recipeService.getById(recipeId)
  );
  // useFetch(recipeService.getById(recipeId));
  const [currentView, setCurrentView] = useState('ingredients');

  // Temporary state: This will actually come from a database
  const [isFavorite, setIsFavorite] = useState(false);

  const [user, setUser] = useState();

  const getUser = async () => {
    const response = await axios.get(
      `http://localhost:5000/api/users/6238f35214df56abcd11c983`
    );

    console.log('IN USERPROFILEPAGE', response.data.user);
    const userData = await response.data.user;
    setUser(userData);

    if (userData.favoriteSpoonacularMeals.some((meal) => meal === recipeId)) {
      console.log('This meal is a favorite already!');
      setIsFavorite(true);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  const toast = useToast();

  const handleFavoriteOnClick = (event) => {
    toast({
      title: 'Favorites Updated',
      description: isFavorite
        ? 'Meal added to Favorites!'
        : 'Meal removed from Favorites',
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'bottom-left',
    });
    // toast({
    //   position: 'bottom-left',
    //   render: () => (
    //     <Box
    //       color="testYellow"
    //       p={3}
    //       bg="#1a1a1a"
    //       rounded="lg"
    //       borderWidth="1px"
    //       borderColor="testYellow"
    //       boxShadow="lg"
    //     >
    //       <HeartFilled />
    //       <Text>Favorites Updated</Text>
    //       <Text>
    //         {isFavorite
    //           ? 'Meal added to Favorites!'
    //           : 'Meal removed from Favorites'}
    //       </Text>
    //     </Box>
    //   ),
    // });

    setIsFavorite((favorite) => !favorite);
  };

  useEffect(() => {
    console.log(`Setting Meal ${recipeId} to Favorite=${isFavorite}`);
    axios
      .patch(`http://localhost:5000/api/users/6238f35214df56abcd11c983`, {
        isFavorite: isFavorite,
        mealID: recipeId,
      })
      .then()
      .catch();
  }, [isFavorite]);

  if (isLoading)
    return (
      <Container
        maxW="container.xl"
        minH="93vh"
        py={10}
        centerContent
        bgColor="primary"
      >
        <Stack direction="row">
          <Text>Fetching Recipe Data</Text>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="lg"
          />
        </Stack>
      </Container>
    );

  if (!recipe) {
    return (
      <Container
        maxW="container.xl"
        minH="93vh"
        py={10}
        centerContent
        bgColor="primary"
      >
        <Stack direction="row">
          <Text>Recipe data was not found</Text>
        </Stack>
      </Container>
    );
  }

  console.log(recipe);

  return (
    <Container
      maxW="container.xl"
      minH="93vh"
      py={10}
      centerContent
      bgColor="primary"
    >
      <Image src={recipe.image} maxH="250px" borderRadius="lg" />
      <Heading as="h1" m="4rem 1rem 2rem 1rem" letterSpacing="4px">
        {recipe.title}
      </Heading>
      <Flex alignItems="center" mb="2rem">
        <Button
          leftIcon={<HeartFilled />}
          onClick={handleFavoriteOnClick}
          borderRadius="full"
          color="testYellow"
          bgColor="transparent"
          _hover={{ backgroundColor: 'secondary' }}
          _active={{ backgroundColor: 'secondary' }}
          padding="0.5rem 3rem"
        >
          {isFavorite ? 'Remove Favorite' : 'Add to Favorites'}
        </Button>
      </Flex>
      <HStack gap="5rem" mb="3rem">
        <Stack
          lineHeight="1"
          justifyContent="center"
          alignItems="center"
          gap="-1rem"
        >
          <ClockCircleFilled style={{ color: '#ffc20d' }} />
          <Text>{recipe.readyInMinutes} Minute</Text>
          <Text>Cooking</Text>
        </Stack>
        <Stack lineHeight="1" justifyContent="center" alignItems="center">
          <StarFilled style={{ color: '#ffc20d' }} />
          <Text>4.08</Text>
          <Text>Rating</Text>
        </Stack>
        <Stack lineHeight="1" justifyContent="center" alignItems="center">
          <FireFilled style={{ color: '#ffc20d' }} />
          <Text>Easy level</Text>
          <Text>Difficulty</Text>
        </Stack>
      </HStack>

      <ButtonGroup
        backgroundColor="#1a1a1a"
        borderRadius="full"
        padding="0.5rem"
        // colorScheme="yellow"
        spacing="3rem"
        mb="2rem"
      >
        <Button
          isActive={currentView === 'instructions'}
          onClick={() => setCurrentView('instructions')}
          borderRadius="full"
          color="testYellow"
          bgColor="transparent"
          _hover={{ backgroundColor: 'secondary' }}
          _active={{ backgroundColor: 'secondary' }}
          padding="0.5rem 3rem"
        >
          Instructions
        </Button>
        <Button
          isActive={currentView === 'ingredients'}
          onClick={() => setCurrentView('ingredients')}
          borderRadius="full"
          color="testYellow"
          bgColor="transparent"
          _hover={{ backgroundColor: 'secondary' }}
          _active={{ backgroundColor: 'secondary' }}
          padding="0.5rem 3rem"
        >
          Ingredients
        </Button>
      </ButtonGroup>

      <Text dangerouslySetInnerHTML={{ __html: recipe.summary }}></Text>
      <Link href={recipe.sourceUrl} isExternal my={4} alignSelf="end">
        Read Original Article &#x27A1;
      </Link>

      {currentView === 'instructions' &&
        (recipe.analyzedInstructions.length > 0 ? (
          <OrderedList>
            {recipe.analyzedInstructions[0].steps.map((step) => (
              <ListItem>{step.step}</ListItem>
            ))}
          </OrderedList>
        ) : (
          <Text>No Instructions Found</Text>
        ))}

      {currentView === 'ingredients' && (
        <Flex flexWrap="wrap" gap={4}>
          {recipe.extendedIngredients.map((ingredient) => (
            <Text
              key={ingredient.id}
              py={2}
              px={4}
              bg="secondary"
              borderRadius="xl"
              boxShadow="lg"
            >
              {ingredient.original}
            </Text>
          ))}
        </Flex>
      )}
    </Container>
  );
}

export default ScreenRecipe;
