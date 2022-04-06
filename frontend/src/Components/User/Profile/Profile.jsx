import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MealPreview } from '../../Meal';
import { Flex, Heading, Image, Text } from '@chakra-ui/react';
// import { useUser } from '../../../Contexts/UserContext';
import axios from 'axios';

function UserProfile() {
  // const { user } = useUser();
  const [user, setUser] = useState();
  const { id } = useParams();

  const fetchUser = async () => {
    const res = axios.get(`http://localhost:5000/api/users/${id}`);
    const data = await res.data;
    setUser(data);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/users/${id}`)
      .then((res) => res.data)
      .then((data) => setUser(data));
  }, []);

  console.log(user);

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
        {user.favoriteMeals.map((favorite) => (
          <MealPreview key={favorite._id} recipe={favorite} />
        ))}
      </Flex>
    </React.Fragment>
  );
}

export default UserProfile;
