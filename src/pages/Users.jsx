import React, { useState, useEffect } from 'react';
import {
  Box,
  HStack,
  Th,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Text,
  Input,
  Button,
  Spacer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  useToast,
  Input as ChakraInput,
} from "@chakra-ui/react";
import axios from "axios";

const Users = () => {
  const { isOpen: isDeleteModalOpen, onOpen: onDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();
  const { isOpen: isUpdateModalOpen, onOpen: onUpdateModalOpen, onClose: onUpdateModalClose } = useDisclosure();

  const toast = useToast();

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [value, setValue] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [editedUser, setEditedUser] = useState({
    name: "",
    email: "",
    city: "",
    street: "", // Added street field
  });

  const itemsPerPage = 5;
  const endIndex = itemsPerPage * currentPage;
  const startIndex = endIndex - itemsPerPage;

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (userId) => {
    onDeleteModalOpen();
    setSelectedUserId(userId);
  };

  const confirmDelete = () => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/users/${selectedUserId}`)
      .then((res) => {
        console.log('User deleted:', selectedUserId, 'This item was deleted:', res.data);
        // Update the data state to remove the deleted user
        setData((prevData) => prevData.filter((user) => user.id !== selectedUserId));
        onDeleteModalClose();

        toast({
          title: "User deleted successfully",
          duration: 5000,
          isClosable: true,
          status: "success",
          position: 'bottom',
        });
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Error while deleting user",
          duration: 5000,
          isClosable: true,
          status: "error",
          position: 'bottom',
        });
      });
  };

  const handleUpdate = (userId) => {
    onUpdateModalOpen();
    setSelectedUserId(userId);

    // Find the user being edited
    const userToEdit = data.find((user) => user.id === userId);

    // Set the initial values for the edited user
    setEditedUser({
      name: userToEdit.name,
      email: userToEdit.email,
      city: userToEdit.address.city,
      street: userToEdit.address.street, // Added street field
    });
  };

  const handleInputChange = (field, value) => {
    // Update the edited user state when input values change
    setEditedUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));
  };

  const confirmUpdate = () => {
    axios
      .put(`https://jsonplaceholder.typicode.com/users/${selectedUserId}`, {
        name: editedUser.name,
        email: editedUser.email,
        address: {
          city: editedUser.city,
          street: editedUser.street, // Updated street field
        },
      })
      .then((res) => {
        console.log('User updated:', res.data);
        // Update the data state with the updated user details
        setData((prevData) =>
          prevData.map((user) =>
            user.id === selectedUserId ? { ...user, ...res.data } : user
          )
        );
        onUpdateModalClose();
        toast({
          title: "User updated successfully",
          duration: 5000,
          isClosable: true,
          status: "success",
          position: 'bottom',
        });
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Error while updating user",
          duration: 5000,
          isClosable: true,
          status: "error",
          position: 'bottom',
        });
      });
  };

  return (
    <>
      <TableContainer bg="white">
        <HStack>
          <Box p={25} maxW="400px" width="100%">
            <Text fontSize={"xl"} fontWeight={"bold"}> Testing Users </Text>
          </Box>
          <Spacer />
          <Box p={25} maxW="400px" width="100%">
            <Input
              variant='outline'
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder='Search User By Name'
              borderColor="black"
              focusBorderColor='red'
            />
          </Box>
        </HStack>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>City</Th>
              <Th>Street</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data
              .filter(
                (user) =>
                  user.name.toLowerCase().includes(value.toLowerCase()) ||
                  user.email.toLowerCase().includes(value.toLowerCase()) ||
                  user.address.city.toLowerCase().includes(value.toLowerCase())
              )
              .slice(startIndex, endIndex)
              .map((user, index) => (
                <Tr key={index}>
                  <Td>{user.id}</Td>
                  <Td>{user.name}</Td>
                  <Td>{user.email}</Td>
                  <Td>{user.address.city}</Td>
                  <Td>{user.address.street}</Td>
                  <Td>
                    <HStack>
                      <Button onClick={() => handleDelete(user.id)}> Delete </Button>
                      <Button onClick={() => handleUpdate(user.id)}> Update </Button>
                    </HStack>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
        <Box mt={4} display="flex" justifyContent="space-between">
          <Button
            onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
            isDisabled={currentPage === 1}
            colorScheme='blue'
          >
            Previous
          </Button>
          <Text mx={4}>Current Page: {currentPage}</Text>
          <Button
            onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
            isDisabled={currentPage === Math.ceil(data.length / itemsPerPage)}
            colorScheme='blue'
          >
            Next
          </Button>
        </Box>
      </TableContainer>

      <Modal isOpen={isDeleteModalOpen} onClose={onDeleteModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete this user?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={confirmDelete}>Delete</Button>
            <Button onClick={onDeleteModalClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isUpdateModalOpen} onClose={onUpdateModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <ChakraInput
                type="text"
                value={editedUser.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
              <FormLabel>Email</FormLabel>
              <ChakraInput
                type="email"
                value={editedUser.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
              <FormLabel>City</FormLabel>
              <ChakraInput
                type="text"
                value={editedUser.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
              />
              <FormLabel>Street</FormLabel>
              <ChakraInput
                type="text"
                value={editedUser.street}
                onChange={(e) => handleInputChange("street", e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={confirmUpdate}>Update</Button>
            <Button onClick={onUpdateModalClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Users;





