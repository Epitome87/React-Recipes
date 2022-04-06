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
        const response = await axios.get(
          `http://localhost:5000/api/users/${userId}`
        );

        setUser(response.data);
      } catch (error) {
        console.log('Error fetching user: ', error);
      }
    }

    getUserFromBackend();
  }, []);

  return (
    <Container maxW="container.xl" centerContent minH="93vh" bg="primary">
      {/* User Profile Screen for User ID {userId} */}
      {user && <UserProfile user={user} />}
    </Container>
  );
}

export default ScreenUserProfile;
