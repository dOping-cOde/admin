
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Input, Text, VStack , useToast, Link} from '@chakra-ui/react';

const Login = ({setAuthenticated}) => {

  const toast = useToast();  
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    
    if (email === 'arun@gmail.com' && password === 'Arun@2001') {
      navigate('/home'); 
      toast({
        title: "Loggin successful",
        duration: 5000,
        isClosable: true,
        status: "success",
        position: 'top-right',
      });
      setAuthenticated(true);
    } else {
      setError('Incorrect email or password. Try again.');

    }
  };

  return (
    <VStack spacing={4} align="center" justify="center" minH="100vh">
      <Box w="300px" p={4} borderWidth="1px" borderRadius="md">
        <Text fontSize="xl" mb={4}>
          Login
        </Text>
        {error && <Text color="red.500">{error}</Text>}
        <form onSubmit={handleSubmit}>
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@gmail.com"
            />
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
            Login
          </Button>
        </form>
        <Text mt={2}>
          Don't have an account{' '}
          <Link color="teal.500" onClick={() => navigate('/signup')}>
            Signup
          </Link>
        </Text>
      </Box>
    </VStack>
  );
};

export default Login;
