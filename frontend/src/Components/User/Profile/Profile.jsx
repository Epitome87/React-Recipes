import React, { useEffect, useState } from 'react';
import { MealPreview } from '../../Meal';
import { Flex, Heading, Image, Stack, Text } from '@chakra-ui/react';

function UserProfile({ user }) {
  const [favoriteMeals, setFavoriteMeals] = useState([]);

  useEffect(() => {
    setFavoriteMeals(user.favoriteMeals);
  }, [user.favoriteMeals]);

  return (
    <React.Fragment>
      <Heading as="h1" color="testYellow" my={4} textDecoration="underline">
        {user.name}'s Profile
      </Heading>
      <Image src={user.image} alt={user.name} borderRadius="lg" />
      <Text mt={10} mb={5} fontSize={'1.5rem'}>
        Favorite Meals ({user.favoriteMeals.length})
      </Text>
      <Flex
        justifyContent="space-around"
        direction="row"
        align="center"
        flexWrap="wrap"
        gap={4}
      >
        {favoriteMeals.map((favorite) => (
          <MealPreview recipe={favorite} />
        ))}
      </Flex>
    </React.Fragment>
  );
}

export default UserProfile;
