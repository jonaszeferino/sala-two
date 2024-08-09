import Head from 'next/head';
import {
  ChakraProvider,
  Box,
  Text,
  Center,
  Heading,
  Image,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { Navbar } from '../components/Navbar';
import { Social } from '../components/Social';
import { useEffect, useState } from 'react';
import { useBreakpointValue } from '@chakra-ui/react';

const Tips = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getGames = async () => {
    try {
      const response = await fetch(`/api/games`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const gamesData = await response.json();
        console.log('Dados dos jogos:', gamesData);
        setIsLoading(false);
        setData(gamesData);
      } else {
        setIsLoading(false);
        console.error('Erro ao buscar os jogos:', response.status);
      }
    } catch (error) {
      setIsLoading(false);
      console.error('Erro inesperado:', error);
    }
  };

  useEffect(() => {
    console.log('Chamou o useEffect');
    getGames();
  }, []);

  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <ChakraProvider>
      <Head>
        <title>Sala de Secacao</title>
        <meta name="description" content="Site do Sala de Secacao" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <Center>
        <Heading mt="50px">Jogos da Dupla Grenal</Heading>
      </Center>
      <br />

      <Center mt="10px" mb="100px">
        <Box overflowX="auto" width="100%" maxWidth="900px">
          {isMobile ? (
            // Layout móvel
            <Table variant="simple">
              <Tbody>
                {data.map((game) => (
                  <Tr key={game.id}>
                    <Td>
                      <VStack align="start" spacing={2}>
                        <Image
                          src={game.championship_logo}
                          alt={game.championship}
                          boxSize="50px"
                          objectFit="contain"
                        />
                        <Text fontWeight="bold">
                          {(() => {
                            const utcDate = new Date(game.match_time);
                            const brasiliaDate = new Date(
                              utcDate.getTime() - 3 * 60 * 60 * 1000
                            );
                            return brasiliaDate.toLocaleString('pt-BR', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                              timeZone: 'America/Sao_Paulo',
                            });
                          })()}
                        </Text>
                        <HStack>
                          <Image
                            src={game.home_team_logo}
                            alt={game.home_team_name}
                            boxSize="30px"
                            objectFit="contain"
                          />
                          <Text>{game.home_team_name}</Text>
                          <Text fontWeight="bold">X</Text>
                          <Image
                            src={game.away_team_logo}
                            alt={game.away_team_name}
                            boxSize="30px"
                            objectFit="contain"
                          />
                          <Text>{game.away_team_name}</Text>
                        </HStack>
                        <Text fontSize="sm">{game.stadium}</Text>
                      </VStack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          ) : (
            // Layout desktop (tabela original sem modificações)
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Competição</Th>
                  <Th>Data</Th>
                  <Th>Time da Casa</Th>
                  <Th></Th>
                  <Th>Time Visitante</Th>
                  <Th>Estádio</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.map((game) => (
                  <Tr key={game.id}>
                    <Td>
                      <HStack>
                        <Image
                          src={game.championship_logo}
                          alt={game.championship}
                          boxSize="100px"
                          objectFit="contain"
                        />
                      </HStack>
                    </Td>
                    <Td>
                      {(() => {
                        const utcDate = new Date(game.match_time);
                        const brasiliaDate = new Date(
                          utcDate.getTime() - 3 * 60 * 60 * 1000,
                        );
                        return brasiliaDate.toLocaleString('pt-BR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          timeZone: 'America/Sao_Paulo',
                        });
                      })()}
                    </Td>
                    <Td>
                      <HStack>
                        <Image
                          src={game.home_team_logo}
                          alt={game.home_team_name}
                          boxSize="50px"
                          objectFit="contain"
                        />
                        <Text>{game.home_team_name}</Text>
                      </HStack>
                    </Td>
                    <Td>X</Td>
                    <Td>
                      <HStack>
                        <Image
                          src={game.away_team_logo}
                          alt={game.away_team_name}
                          boxSize="50px"
                          objectFit="contain"
                        />
                        <Text>{game.away_team_name}</Text>
                      </HStack>
                    </Td>
                    <Td>{game.stadium}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )}
        </Box>
      </Center>

      <Social />
    </ChakraProvider>
  );
};

export default Tips;