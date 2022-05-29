import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container } from '@chakra-ui/react';
import { UserProfile } from '../Components/User';

function ScreenUserProfile() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUserFromBackend() {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${userId}`);

        console.log('IN USERPROFILEPAGE', response.data.user);
        const userData = await response.data.user;
        setUser(userData);
      } catch (error) {
        console.log('Error fetching user: ', error);
      }
    }

    getUserFromBackend();
  }, []);

  return (
    <Container maxW='container.xl' centerContent minH='93vh' bg='primary'>
      {/* It's okay we're passing user down here. This user isn't the one we are storing in our global Context! */}
      {/* If we didn't pass it down here, we'd have to re-fetch this User info from our server in each child component */}
      {/* Or perhaps we can look into global state for fetched users */}
      {user && <UserProfile user={user} />}
    </Container>
  );
}

export default ScreenUserProfile;
