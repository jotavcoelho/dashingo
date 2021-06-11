import { 
  Box, 
  Button, 
  Divider, 
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  VStack, 
} from "@chakra-ui/react";
import Link from "next/link";
import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';


type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const createUserFormSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().required('E-mail is required').email('Invalid E-mail'),
  password: yup.string().required('Password is required').min(7, 'Minimum of 7 characters'),
  confirm_password: yup.string().oneOf([
    null, yup.ref('password')
  ], "Passwords don't match"),
})

export default function CreateUser() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createUserFormSchema)
  })

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values) => {
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log(values);
  }

  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxW={1128} mx="auto" px="6">
        <Sidebar />

        <Box 
          as="form" 
          flex="1" 
          borderRadius={8} 
          bg="gray.800" 
          p="8"
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading size="lg" fontWeight="normal">Create User</Heading>

          <Divider my="6" borderColor="gray.700" />

          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
              <Input 
                name="name" 
                label="Full name" 
                error={formState.errors.name}
                {...register('name')} 
              />
              <Input 
                name="email" 
                type="email" 
                label="E-mail" 
                error={formState.errors.email}
                {...register('email')}
              />
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
              <Input 
                name="password" 
                type="password" 
                error={formState.errors.password}
                label="Password" 
                {...register('password')}
              />
              <Input 
                name="confirm_password" 
                type="password" 
                label="Confirm password" 
                error={formState.errors.confirm_password}
                {...register('confirm_password')}
              />
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button as="a" colorScheme="whiteAlpha">Cancel</Button>
              </Link>
              <Button 
                type="submit" 
                colorScheme="pink"
                isLoading={formState.isSubmitting}
              >Save</Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}