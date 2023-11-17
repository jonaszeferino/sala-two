import Head from "next/head";
import { ChakraProvider, Text, Center } from "@chakra-ui/react";
import Sidebar from "../../components/Sidebar";

export default function Home() {
  return (
    <ChakraProvider>
      <Head>
        <title>Sala de Secacao</title>
        <meta name="description" content="Site do Sala de Secacao" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Sidebar />
      <Center>
        <Text>Area Administrativa</Text>
      </Center>
    </ChakraProvider>
  );
}
