import React from 'react';
import { Button, Text } from '@chakra-ui/react';
import { CATEGORIES } from '../../../../utils/mockData';

interface Category {
  id: number;
  text: string;
  icon: string;
}

interface CategoryButtonProps {
  category: Category;
  isSelected: boolean;
  onClickHandler(id: number): void;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({
  category = CATEGORIES[2],
  isSelected = false,
  onClickHandler,
}) => {
  const { id, text, icon } = category;

  return (
    <Button
      width='150px'
      bg={isSelected ? 'testYellow' : 'secondary'}
      color={isSelected ? 'secondary' : 'white'}
      letterSpacing='1px'
      borderRadius='xl'
      fontSize='12px'
      _hover={{
        color: 'secondary',
        bg: 'testYellow',
      }}
      _focus={{
        outline: 'none',
      }}
      _active={{
        bg: 'white',
      }}
      onClick={() => onClickHandler(id)}
    >
      <Text fontSize='18px'>{icon}</Text>
      <Text ml={3}>{text.toUpperCase()}</Text>
    </Button>
  );
};

export default CategoryButton;
