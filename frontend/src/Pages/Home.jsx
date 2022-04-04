import React, { useEffect } from 'react';
import { Container } from '@chakra-ui/react';
import { UserGreeting } from '../Components/User';
import { MealCategories, MealRecommendation } from '../Components/Meal';
import { users } from '../utils/mockData';
import axios from 'axios';
import { useUser } from '../Contexts/UserContext';

function ScreenHome() {
  const testUser = useUser();

  useEffect(() => {
    const fetchUserFromDatabase = async () => {
      // Fetch user from our DB! For now, just the first user found
      try {
        const fetchedData = await axios.get(
          'http://localhost:5000/api/users/62462cc3dec095aaf6d10dbc'
        );
        // Our api returns an object with a user object as one key -- we only want that object
        const fetchedUser = fetchedData.data.user;

        console.log(`Saving to key 'user' in localStorage`);
        console.dir(fetchedUser);
        localStorage.setItem('user', JSON.stringify(fetchedUser));
        testUser.login(fetchedUser);
      } catch (error) {
        // No user properly fetched, let's make one up for now!
        testUser.login(users[2]);
      }
    };

    const localUser = localStorage.getItem('user');
    if (localUser) {
      console.log('Found local user data -- using that for user information!');
      testUser.login(JSON.parse(localUser));
    } else {
      console.log(
        "Didn't find local user data -- attempting to fetch user from database!"
      );
      fetchUserFromDatabase();
    }
  }, []);

  return (
    <Container maxW="container.xl" minH="93vh" bg="primary">
      <UserGreeting />
      <MealRecommendation />
      <MealCategories />
    </Container>
  );
}

export default ScreenHome;
