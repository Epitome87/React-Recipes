import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MealPreview } from '../../Meal';
import { Flex, Heading, Image, Text } from '@chakra-ui/react';
// import { useUser } from '../../../Contexts/UserContext';
import { getRecipeById } from '../../../api/recipeSearch';
import axios from 'axios';

const UserProfile: React.FC = () => {
  const { user } = useUser();

  const [spoonacularFavorites, setSpoonacularFavorites] = useState([]);

  useEffect(() => {
    async function getUserFromBackend() {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/${userId}`
        );

        console.log('IN USERPROFILEPAGE', response.data.user);
        const userData = await response.data.user;
        console.log('SIGH', userData);

        for (let i = 0; i < userData.favoriteSpoonacularMeals.length; i++) {
          const test = await getRecipeById(
            userData.favoriteSpoonacularMeals[i]
          );
          setSpoonacularFavorites((favs) => [...favs, test]);
        }
        setUser(userData);
        console.log(spoonacularFavorites);
        console.log('IN USERPROFILEPAGE', response.data.user);
      } catch (error) {
        console.log('Error fetching user: ', error);
      }
    }

    getUserFromBackend();
  }, []);

  console.log(user);
  console.log('SPOONS: ', spoonacularFavorites);

  if (!user) {
    return <div>Loading User...</div>;
  }

  return (
    <React.Fragment>
      <Heading as='h1' color='testYellow' my={4} textDecoration='underline'>
        {user.name}'s Profile
      </Heading>
      <Image src={user.image} alt={user.name} borderRadius='lg' />
      <Text mt={10} mb={5} fontSize={'1.5rem'}>
        Favorite Meals ({user.favoriteMeals.length})
      </Text>
      <Flex justifyContent='space-around' direction='row' align='center' flexWrap='wrap' gap={4}>
        {user.favoriteMeals.map((favorite) => (
          <MealPreview key={favorite._id} recipe={favorite} />
        ))}
      </Flex>
      <Flex
        justifyContent="space-around"
        direction="row"
        align="center"
        flexWrap="wrap"
        gap={4}
      >
        {spoonacularFavorites.map((favorite) => (
          <MealPreview key={favorite._id} recipe={favorite} isSpoon={true} />
        ))}
      </Flex>
    </React.Fragment>
  );
};

export default UserProfile;
