import { 
  Box, 
  Button, 
  Checkbox, 
  Flex, 
  Heading, 
  Icon, 
  Spinner,
  Table, 
  Tbody, 
  Td, 
  Text, 
  Th, 
  Thead,
  Tr,
  useBreakpointValue, 
} from "@chakra-ui/react";
import Link from "next/link";
import { useEffect } from "react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { useQuery } from 'react-query';
import { api } from "../../services/api";
import { useUsers } from "../../services/hooks/useUsers";

import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";

export default function UserList() {
  const { data, isLoading, isFetching, error } = useUsers();

  const isWide = useBreakpointValue({
    base: false,
    lg: true,
  });
  
  useEffect(() => {
    fetch('http://localhost:3000/api/users')
    .then(response => response.json())
    .then(data => console.log(data));
  }, [])

  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxW={1128} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Users
              { !isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4" /> }
            </Heading>

            <Link href="/users/create" passHref>
              <Button
                as="a" 
                size="sm" 
                fontSize="sm" 
                colorScheme="pink"
                leftIcon={<Icon as={RiAddLine} fontSize="20"/>}
              >
                Create new User
              </Button>
            </Link>
          </Flex>

          { isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify="center">Failure obtaining user data</Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
              <Thead>
                <Tr>
                  <Th px={["4", "4", "6" ]} color="gray.300" p="8">
                    <Checkbox colorScheme="pink"/>
                  </Th>
                  <Th>User</Th>
                  {isWide && <Th>Date of signing</Th>}
                  {isWide && <Th w="8"></Th>}
                </Tr>
              </Thead>
              <Tbody>
                {data.map(user => {
                  return (
                    <Tr key={user.id}>
                      <Td px={["4", "4", "8"]}>
                        <Checkbox colorScheme="pink"/>
                      </Td>
                      <Td>
                        <Box>
                          <Text fontWeight="bold">{user.name}</Text>
                          <Text fontSize="sm" color="gray.300">{user.email}</Text>
                        </Box>
                      </Td>
                      {isWide && <Td>{user.createdAt}</Td>}
                      {isWide && <Td>
                        <Button
                          as="a" 
                          size="sm" 
                          fontSize="sm" 
                          colorScheme="purple"
                          leftIcon={<Icon as={RiPencilLine} fontSize="16"/>}
                        >
                          { isWide ? 'Edit' : '' }
                        </Button>
                      </Td>}
                    </Tr>
                  )
                })}
              </Tbody>
            </Table>

            <Pagination 
              totalCountOfRegisters={200}
              currentPage={5}
              onPageChange={() => {}}
            />
          </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}