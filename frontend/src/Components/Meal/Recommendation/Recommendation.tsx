import React from 'react';
import { Box, Container, Flex, Spinner, Stack, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { ClockCircleOutlined, FireOutlined } from '@ant-design/icons';
import currentMealTime from '../../../utils/currentMealTime';
import useFetch from '../../../utils/hooks/useFetch';
import { recipeService } from '../../../api/recipes.service';

export const MealRecommendation: React.FC = () => {
  const { mealType, recommendationMessage } = currentMealTime();

  /* Implementation of useFetch hook. Still grasping how to implent a cleaner way to pass
  helper fn in this fetch custom hook and how to pass helpers that accept arguments like ex: recipe_id. 
  I still don't if this is good approach or not. Please tell me what you think? */
  const [data, loading, error] = useFetch(recipeService.getRecipesByParams({ type: mealType, number: 1 }));

  if (error) {
    // This need to go in some global Error handler.
    console.log(error);
    return <p>Failed to fetch recommendation!</p>;
  }

  //This should be returning UI component with some spinner.
  if (loading)
    return (
      <Flex>
        <Text>Finding recommendation tailored to you! </Text>
        <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='lg' />
      </Flex>
    );

  return (
    <Container maxW='container.xl' centerContent>
      <Link to={`/recipes/${data.results[0].id}`}>
        <Flex
          border={'5px solid'}
          borderColor='secondary'
          boxShadow={'xl'}
          background={`linear-gradient(to right, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.35)), url('${data.results[0].image}')`}
          p={8}
          w='90vw'
          maxW={600}
          h={200}
          backgroundSize='cover'
          backgroundPosition={'center'}
          borderRadius={20}
          flexDir='column'
          lineHeight={1}
          color='white'
          justify='space-around'
        >
          <Text fontSize='1.2rem' color='textFaint' fontWeight='bold'>
            {recommendationMessage}
          </Text>
          <Text fontSize='1.5rem' fontWeight='bold' color='testYellow'>
            {data.results[0].title}
          </Text>
          <Flex gap={4}>
            <Flex align='center' justify='center' gap={2}>
              <Box bg='testYellow' p={2} borderRadius='md'>
                <ClockCircleOutlined style={{ color: 'black' }} />
              </Box>
              <Text fontSize='1.2rem' color='testYellow'>
                {data.results[0].readyInMinutes || '30 min'}
              </Text>
            </Flex>
            <Flex align='center' justify='center' gap={2}>
              <Box bg='testYellow' p={2} borderRadius='md'>
                <FireOutlined style={{ color: 'black' }} />
              </Box>
              <Text fontSize='1.2rem' color='testYellow'>
                {data.results[0].difficulty || 'Easy lvl'}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Link>
    </Container>
  );
};

export default MealRecommendation;
