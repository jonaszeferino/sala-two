import Head from 'next/head';
import { ChakraProvider, Center, Box } from '@chakra-ui/react';
import Auth from '../../components/Auth';

export default function Home() {
  return (
    <ChakraProvider>
      <Head>
        <title>Sala de Secacao</title>
        <meta name="description" content="Site do Sala de Secacao" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box mt="100px">
        <Auth />
      </Box>
    </ChakraProvider>
  );
}
