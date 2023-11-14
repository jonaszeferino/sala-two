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
  Switch,
  Stack,
  Heading,
} from "@chakra-ui/react";
import Sidebar from "../../components/Sidebar";
import { useState } from "react";

export default function PalpitesForm() {
  const [homeScore, setHomeScore] = useState("");
  const [awayScore, setAwayScore] = useState("");

  const handleHomeScoreChange = (event) => {
    setGremioScore(event.target.value);
  };

  const handleAwayScoreChange = (event) => {
    setCorinthiansScore(event.target.value);
  };

  const handleSubmit = () => {
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

      <Center mt="50px" mb="50px">
        <Heading>Partidas</Heading>
      </Center>

      <ChakraProvider>
        <Center ml="100px">
          <VStack spacing={4} align="stretch">
            <HStack spacing={4}>
              <FormControl id="homeScore">
                <FormLabel>Em casa</FormLabel>
                <Input
                  type="text"
                  value={homeScore}
                  onChange={handleHomeScoreChange}
                />
              </FormControl>

              <FormControl id="awayScore">
                <FormLabel>Fora de Casa</FormLabel>
                <Input
                  type="text"
                  value={awayScore}
                  onChange={handleAwayScoreChange}
                />
              </FormControl>

              <FormControl id="corinthiansScore">
                <FormLabel>Data e hora do Jogo</FormLabel>
                <Input
                  type="datetime-local"
                  value={awayScore}
                  onChange={handleAwayScoreChange}
                />
              </FormControl>

              <FormControl id="corinthiansScore">
                <FormLabel>Campeonato</FormLabel>
                <Input
                  type="text"
                  value={awayScore}
                  onChange={handleAwayScoreChange}
                />
              </FormControl>
              <FormControl id="corinthiansScore">
                <Stack direction="row">
                  <Switch colorScheme="teal" size="lg" />
                </Stack>
              </FormControl>
            </HStack>

            <Button colorScheme="blue" onClick={handleSubmit}>
              Salvar Partida
            </Button>
          </VStack>
        </Center>
      </ChakraProvider>

      <Center mt="150px">
        <Heading>Partidas Salvas</Heading>
      </Center>
    </ChakraProvider>
  );
}
