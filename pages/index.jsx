import Head from 'next/head';
import { Text, Center, Heading, Flex } from '@chakra-ui/react';
import { Navbar } from '../components/Navbar';
import { Social } from '../components/Social';

export default function Home() {
  return (
    <Flex direction="column">
      <Head>
        <title>Sala de Secacao</title>
        <meta name="description" content="Site do Sala de Secacao" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <Center flexDirection="column" gap="10px" mt="10px">
        <Heading>Site em construção</Heading>
        <Text>Acesse nosso conteúdo abaixo</Text>
      </Center>

      <Social />
    </Flex>
  );
}
