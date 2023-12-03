import Head from 'next/head';
import {
  ChakraProvider,
  Flex,
  Text,
  Divider,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Button,
} from '@chakra-ui/react';

export default function Home() {
  return (
    <ChakraProvider>
      <Head>
        <title>Sala de Secacao</title>
        <meta name="description" content="Site do Sala de Secacao" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex>
        <Divider orientation="vertical" height="100vh" />

        <Flex direction="column" align="center" justify="center" flex="1" p="8">
          <Text fontSize="xl" fontWeight="bold" mb="4">
            Login
          </Text>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input type="email" />
          </FormControl>
          <FormControl>
            <FormLabel>Senha</FormLabel>
            <InputGroup>
              <Input type="password" />
            </InputGroup>
          </FormControl>
          <br />
          <Button>Entrar</Button>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}
