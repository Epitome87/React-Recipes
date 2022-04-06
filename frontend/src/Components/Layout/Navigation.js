import React from 'react';
import { NavLink } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';
import {
  CalendarOutlined,
  FileSearchOutlined,
  HomeOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { motion } from 'framer-motion';

function Navigation() {
  return (
    <Flex
      sx={{
        position: '-webkit-sticky',
        /* Safari */ position: 'sticky',
        bottom: '0',
      }}
      //   bg="#2c2c2c"
      bgColor="primary"
      h="5rem"
      fontSize="1.5rem"
      //   borderTopRightRadius="2rem"
      //   borderTopLeftRadius="2rem"
      alignItems="center"
      justifyContent="space-evenly"
    >
      <motion.div
        whileHover={{
          scale: 1.3,
          transition: { duration: 0.3 },
        }}
        whileTap={{ scale: 0.9 }}
      >
        <NavLink to="/">
          <HomeOutlined />
        </NavLink>
      </motion.div>
      <motion.div
        whileHover={{
          scale: 1.3,
          transition: { duration: 0.3 },
        }}
        whileTap={{ scale: 0.9 }}
      >
        <NavLink to="/search">
          <SearchOutlined />
        </NavLink>
      </motion.div>
      <motion.div
        whileHover={{
          scale: 1.3,
          transition: { duration: 0.3 },
        }}
        whileTap={{ scale: 0.9 }}
      >
        <NavLink to="/recipes">
          <FileSearchOutlined />
        </NavLink>
      </motion.div>
      <motion.div
        whileHover={{
          scale: 1.3,
          transition: { duration: 0.3 },
        }}
        whileTap={{ scale: 0.9 }}
      >
        <NavLink to="/test">
          <CalendarOutlined />
        </NavLink>
      </motion.div>
    </Flex>
  );
}

export default Navigation;
