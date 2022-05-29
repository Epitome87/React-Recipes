import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        color: 'white',
        lineHeight: 'tall',
        bg: 'primary',
      },
      a: {
        color: 'yellow.500',
      },
      h1: {
        fontSize: ['30px !important', '42px !important'],
      },
      h2: {
        fontSize: ['26px', '38px'],
      },
      h3: {
        fontSize: ['16px !important', '28px !important'],
      },
    },
  },
  fonts: {
    heading: 'Barlow, sans-serif',
    body: 'Barlow, sans-serif',
  },
  colors: {
    testYellow: '#ffc20d', // Active tabs, clock / star / flame icons, recommended meal font
    primary: '#212121', // Background
    secondary: '#272727', // Recipe cards, Ingredient Cards
    navInactive: '#828282',
    navActive: 'yellow.500',
    textFaint: '#8e8e8e', // Maybe same as navActive? This is the color my eyedrop got from "Ready to cook dinner?"
    textGray: '#ABBBC2',
  },
});

export default theme;
