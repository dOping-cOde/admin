import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Input, Text, VStack, Link, useToast } from '@chakra-ui/react';

  const SignUp = ({setAuthenticated}) => {
  const navigate = useNavigate();
  const toast = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = (e) => {
      e.preventDefault();
      navigate('/home');
    toast({
        title: "Signup successful",
        duration: 5000,
        isClosable: true,
        status: "success",
        position: 'top-right',
      });
      setAuthenticated(true);
  };

  return (
    <VStack spacing={4} align="center" justify="center" minH="100vh">
      <Box w="300px" p={4} borderWidth="1px" borderRadius="md">
        <Text fontSize="xl" mb={4}>
          Sign Up
        </Text>
        <form onSubmit={handleSignUp}>
          <FormControl id="name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </FormControl>
          <FormControl id="email" mt={4} isRequired>
            <FormLabel>Email</FormLabel>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormControl>
          <FormControl id="password" mt={4} isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button type="submit" colorScheme="teal" mt={4} w="100%">
            Sign Up
          </Button>
        </form>
        <Text mt={2}>
          Already have an account?{' '}
          <Link color="teal.500" onClick={() => navigate('/')}>
            Login
          </Link>
        </Text>
      </Box>
    </VStack>
  );
};

export default SignUp;
