import React from 'react';
import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import * as mealHelper from '../../../utils/meal';

function UserGreeting({ user }) {
  return (
    <Flex
      flexWrap="wrap-reverse"
      justify="space-between"
      align="center"
      my={10}
    >
      <Link
        to={`/users/${user._id}`}
        style={{ color: 'inherit', textDecoration: 'inherit' }}
      >
        <Box role="group">
          <Heading
            as="h1"
            _groupHover={{ color: 'testYellow' }}
            transition={'color 0.5s ease-in-out'}
          >
            Hi, {user.name}
          </Heading>
          <Text
            color="textFaint"
            fontWeight="bold"
            fontSize={'1.75rem'}
            lineHeight={1}
            mt={2}
          >
            {mealHelper.greetingMessage()}
          </Text>
        </Box>
      </Link>

      <Link
        to={`/users/${user._id}`}
        style={{ color: 'inherit', textDecoration: 'inherit' }}
      >
        <Image
          border={'2px solid'}
          borderColor="testYellow"
          boxShadow="xl"
          src={user.image}
          alt={user.name}
          borderRadius="3xl"
          height="100px"
        />
      </Link>
    </Flex>
  );
}

export default UserGreeting;
