import React, { useEffect, useState } from 'react';
import { Container } from '@chakra-ui/react';
import { UserGreeting } from '../Components/User';
import { MealCategories, MealRecommendation } from '../Components/Meal';
import { users } from '../utils/mockData';
import axios from 'axios';

function ScreenHome() {
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchUserFromDatabase = async () => {
      // Fetch user from our DB! For now, just the first user found
      const fetchedData = await axios.get('http://localhost:5000/api/users');
      const fetchedUser = fetchedData.data[2];

      localStorage.setItem('user', JSON.stringify(fetchedUser));
      setUser(fetchedUser);
      console.log(fetchedUser);
    };

    const localUser = localStorage.getItem('user');
    if (localUser) {
      console.log('Found local user data -- using that for user information!');
      setUser(JSON.parse(localUser));
    } else {
      console.log(
        "Didn't find local user data -- attempting to fetch user from database!"
      );
      fetchUserFromDatabase();
    }
  }, []);

  return (
    <Container maxW="container.xl" minH="93vh" bg="primary">
      <UserGreeting user={user ? user : users[0]} />
      <MealRecommendation />
      <MealCategories />
    </Container>
  );
}

export default ScreenHome;
