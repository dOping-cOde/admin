
import React from 'react';
// import Users from '../pages/Users'
import Users from '../../pages/Users'
import { Routes, Route, Link, useNavigate} from 'react-router-dom';
import {
  Box,
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  AccordionIcon,
  VStack,
  Text,
} from '@chakra-ui/react';

const Index = () => {
  const navigate = useNavigate();
  return (
    <div>
      <VStack align="center" spacing={4}>
      <Text
          fontSize="2xl"
          fontFamily="monospace"
          fontWeight="bold"
          color="#fff"
          mt="20px"
  > Admin Panel
        </Text>
         <Text fontSize="18px">Dashboard</Text>

        <VStack align="start" spacing={2}>
          <Accordion defaultIndex={[]} allowMultiple>
           
            <AccordionItem border="none">
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                     User Management
                  </Box>
                  <AccordionIcon ml= "40px"/>
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                
            <Link color="teal.500" onClick={() => navigate('/users')}>
            Users
          </Link>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem border="none">
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    Section 1 title
                  </Box>
                  <AccordionIcon ml= "40px"/>
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>ITEM1</AccordionPanel>
            </AccordionItem>

            <AccordionItem border="none">
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    Section 1 title
                  </Box>
                  <AccordionIcon ml= "40px"/>
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>ITEM1</AccordionPanel>
            </AccordionItem>
            <AccordionItem border="none">
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    Section 1 title
                  </Box>
                  <AccordionIcon ml= "40px"/>
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>ITEM1</AccordionPanel>
            </AccordionItem>

           
            
          </Accordion>
        </VStack>

      </VStack>

      <Routes>
        {/* <Route path = "/users "element = {{co}}/> */}

        <Route path = '/users' element = {<Users/>}/>
        {/* <Route path = '/users' element = {<Users/>}/> */}
        {/* <Route path = '/users' element = {<Users/>}/> */}
      </Routes>
    </div>
  );
};

export default Index;
