import React from 'react';
import { Link as ReactLink } from 'react-router-dom';
import { Image, Flex, Stack, Text, Box } from '@chakra-ui/react';
import { StarFilled } from '@ant-design/icons';

// TODO: Make this a helper...somewhere!
const mealDifficultyToString = (difficulty) => {
  if (difficulty >= 4) return 'Challenging';
  if (difficulty >= 3) return 'Hard';
  if (difficulty >= 2) return 'Medium';

  return 'Easy';
};

function MealPreview({ recipe }) {
  const id = recipe._id ? recipe._id : recipe.id;
  return (
    <ReactLink to={`/recipes/${id}`}>
      <Stack
        key={recipe._id}
        role="group"
        spacing={1}
        direction="column"
        alignItems="center"
        flexWrap="wrap"
        gap={1}
        mt={20}
        padding={'0 2rem 2rem 2rem'}
        backgroundColor="secondary"
        borderRadius="3xl"
        boxShadow="xl"
        width="260px"
        _hover={{ backgroundColor: 'testYellow' }}
        transition={'all .2s ease-in-out'}
      >
        <Box
          mt="-60px"
          border={'2px solid'}
          borderColor="testYellow"
          borderRadius="full"
          overflow="hidden"
          boxSize="120px"
        >
          <Image
            src={recipe.image}
            alt={recipe.title}
            boxSize="120px"
            fit="cover"
            align="center center"
            transition={'transform 0.5s ease-in-out'}
            _groupHover={{ transform: 'scale(1.10)' }}
          />
        </Box>

        <Flex
          flexDir="column"
          justifyContent="center"
          lineHeight="1.2"
          height="45px"
        >
          <Text
            color="white"
            fontWeight="bold"
            textAlign="center"
            noOfLines="2"
            _groupHover={{ color: 'black' }}
          >
            {recipe.title}
          </Text>
        </Flex>

        <Box color="testYellow" lineHeight="1" _groupHover={{ color: 'white' }}>
          {/* Calculate how many Star icons we need, based on the difficulty */}
          {Array.apply(null, { length: Math.round(recipe.difficulty) }).map(
            (e, index) => (
              <StarFilled key={index} />
            )
          )}
        </Box>
        <Flex lineHeight="1" color="textGray" _groupHover={{ color: 'black' }}>
          <Box>{recipe.readyInMinutes} Min</Box>
          <Box mx="1rem">|</Box>
          <Box>{mealDifficultyToString(recipe.difficulty)} Lvl</Box>
        </Flex>
      </Stack>
    </ReactLink>
  );
}

export default MealPreview;
