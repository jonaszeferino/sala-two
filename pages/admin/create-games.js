import Head from "next/head";
import {
  ChakraProvider,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  Center,
  HStack,
} from "@chakra-ui/react";
import Sidebar from "../../components/Sidebar";
import { useState } from "react";

export default function PalpitesForm() {
  const [gremioScore, setGremioScore] = useState(0);
  const [corinthiansScore, setCorinthiansScore] = useState(0);

  const handleGremioScoreChange = (event) => {
    setGremioScore(event.target.value);
  };

  const handleCorinthiansScoreChange = (event) => {
    setCorinthiansScore(event.target.value);
  };

  const handleSubmit = () => {
    // Aqui você pode enviar os palpites, fazer validações ou qualquer outra ação necessária
    console.log(
      `Palpite: Grêmio ${gremioScore} x ${corinthiansScore} Corinthians`
    );
  };
  return (
    <ChakraProvider>
      <Head>
        <title>Sala de Secacao</title>
        <meta name="description" content="Site do Sala de Secacao" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Sidebar />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <Center>
        <Text>Palpites</Text>
      </Center>

      <ChakraProvider>
        <VStack spacing={4} align="stretch">
          <HStack spacing={4}>
            <FormControl id="gremioScore">
              <FormLabel>Placar do Grêmio</FormLabel>
              <Input
                type="number"
                value={gremioScore}
                onChange={handleGremioScoreChange}
              />
            </FormControl>

            <FormControl id="corinthiansScore">
              <FormLabel>Placar do Corinthians</FormLabel>
              <Input
                type="number"
                value={corinthiansScore}
                onChange={handleCorinthiansScoreChange}
              />
            </FormControl>
          </HStack>

          <Button colorScheme="blue" onClick={handleSubmit}>
            Enviar Palpites
          </Button>
        </VStack>
      </ChakraProvider>
    </ChakraProvider>
  );
}
