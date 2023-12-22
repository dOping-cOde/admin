import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import Sidebar from '../includes/Sidebar/index';
import Header from '../includes/Header/index';
import Footer from '../includes/Footer/index';
import Users from './Users'
// import Users from '../includes/Main/index'
// import Main from '../includes/Main/index'

const Home = () => {
  return (
    <Flex direction="row" width='100vw' overflow="auto">
      <Box bg="#004e92" color="white" width="300px" height="100vh">
        <Sidebar />
      </Box>

      <Flex direction="column" flex="1" width="100%" bg="#7baac9">
        <Box bg="white" height="10vh" width="100%">
      
          <Header />
        </Box>
        <Box bg="white" flex="1" width="100%">
          <Users />
        </Box>

        <Box p="4" bg="white" color="white" height="10vh" width="100%">
          
          <Footer />
        </Box>
      </Flex>
    </Flex>
  );
};

export default Home;
