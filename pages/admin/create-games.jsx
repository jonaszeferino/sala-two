import Head from 'next/head';
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
  Heading,
  Select,
  Divider,
  Image,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
} from '@chakra-ui/react';
import Sidebar from '../../components/Sidebar';
import { useState, useEffect } from 'react';
import LoggedUser from '../../components/LoggedUser';
import { supabase } from '../../utils/supabaseClientAdmin';
import Auth from '../../components/Auth';
import { useToast } from '@chakra-ui/react';

export default function PalpitesForm() {
  const [homeClub, setHomeClub] = useState('');
  const [awayClub, setAwayClub] = useState('');

  const [clubs, setClubs] = useState([]);
  const [date, setDate] = useState('');
  const [championship, setChampionship] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateGames, setShowCreateGames] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSave, setIsSave] = useState(false);
  const [dataGame, setDataGame] = useState([]);
  const [session, setSession] = useState(false);
  const [championships, setChampionships] = useState([]);
  const [stadium, setStadium] = useState('');
  const [games, setGames] = useState([]);
  const toast = useToast();

  useEffect(() => {
    let mounted = true;
    async function getInitialSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (mounted) {
        if (session) {
          setSession(session);
          await getClubs();
          setShowCreateGames(true);
        }
        setIsLoading(false);
      }
    }
    getInitialSession();
    const { subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      },
    );
    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  const fetchGames = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/games');
      if (response.ok) {
        const data = await response.json();
        setGames(data);
        setDataGame(data);
      } else {
        console.error('Erro ao buscar jogos:', response.status);
        toast({
          title: 'Erro ao carregar jogos',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Erro inesperado ao buscar jogos:', error);
      toast({
        title: 'Erro ao carregar jogos',
        description: 'Ocorreu um erro inesperado',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      fetchGames();
    }
  }, [session]);

  const handleHomeClubChange = (event) => {
    setHomeClub(event.target.value);
  };

  const handleAwayClubChange = (event) => {
    setAwayClub(event.target.value);
  };

  const handleChampioship = (event) => {
    setChampionship(event.target.value);
  };

  const handleDate = (event) => {
    setDate(event.target.value);
  };

  const getClubs = async () => {
    try {
      console.log('Iniciando busca de clubes');
      const response = await fetch(`/api/clubs`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Resposta recebida:', response.status);
      if (response.ok) {
        const clubsData = await response.json();
        console.log('Dados recebidos:', clubsData);
        setClubs(clubsData);
      } else {
        console.error('Erro ao buscar os clubes:', response.status);
        toast({
          title: 'Erro ao carregar clubes',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Erro inesperado:', error);
      toast({
        title: 'Erro ao carregar clubes',
        description: 'Ocorreu um erro inesperado',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    getClubs();
  }, []);

  const saveGames = async () => {
    setIsSaving(true);
    setIsSave(false);

    // Converter a data do Brasil para UTC
    const brasiliaDate = new Date(date);
    const utcDate = new Date(brasiliaDate.getTime() + 3 * 60 * 60 * 1000);

    const data = {
      home_team: homeClub,
      away_team: awayClub,
      match_time: utcDate.toISOString(), // Usar a data UTC
      stadium: stadium,
      score_home_team: 0,
      score_away_team: 0,
      winner: null,
      is_deleted: false,
      is_visible: true,
      championship_id: championship, // Certifique-se de que este campo está correto
    };

    try {
      const response = await fetch('/api/games', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast({
          title: 'Jogo salvo com sucesso!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        setIsSave(true);
        fetchGames(); // Atualiza a lista de jogos após salvar

        // Limpar os campos após salvar
        setHomeClub('');
        setAwayClub('');
        setDate('');
        setStadium('');
        setChampionship('');
      } else {
        throw new Error('Falha ao salvar o jogo');
      }
    } catch (error) {
      console.error('Erro ao salvar jogo:', error);
      toast({
        title: 'Erro ao salvar jogo',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const fetchChampionships = async () => {
    try {
      const response = await fetch('/api/championship');
      if (response.ok) {
        const data = await response.json();
        setChampionships(data);
      } else {
        console.error('Erro ao buscar campeonatos:', response.status);
      }
    } catch (error) {
      console.error('Erro inesperado ao buscar campeonatos:', error);
    }
  };

  useEffect(() => {
    getClubs();
    fetchChampionships();
    fetchGames();
  }, []);

  const handleStadiumChange = (event) => {
    setStadium(event.target.value);
  };

  return (
    <>
      <Head>
        <title>Sala de Secacao</title>
        <meta name="description" content="Site do Sala de Secacao" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {isLoading ? (
        <Center>
          <Text>Carregando...</Text>
        </Center>
      ) : session ? (
        <ChakraProvider>
          <Sidebar />
          <LoggedUser />
          {showCreateGames ? (
            <>
              <Center mt="60px" mb="20px">
                <Heading>Criar Partidas</Heading>
              </Center>

              <Center ml="100px">
                <VStack spacing={4} align="stretch">
                  <HStack spacing={4}>
                    <FormControl id="homeClub">
                      <FormLabel>Time em Casa</FormLabel>
                      <Select value={homeClub} onChange={handleHomeClubChange}>
                        <option value="">Selecione um time</option>
                        {clubs.map((club) => (
                          <option key={club.id} value={club.id}>
                            {club.name}
                          </option>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl id="awayClub">
                      <FormLabel>Fora de Casa</FormLabel>
                      <Select value={awayClub} onChange={handleAwayClubChange}>
                        <option value="">Selecione um time</option>
                        {clubs.map((club) => (
                          <option key={club.id} value={club.id}>
                            {club.name}
                          </option>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl id="date">
                      <FormLabel>Data e hora do Jogo</FormLabel>
                      <Input
                        type="datetime-local"
                        value={date}
                        onChange={handleDate}
                      />
                    </FormControl>

                    <FormControl id="championship">
                      <FormLabel>Campeonato</FormLabel>
                      <Select value={championship} onChange={handleChampioship}>
                        {championships.map((champ) => (
                          <option key={champ.id} value={champ.id}>
                            {champ.name}
                          </option>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl id="stadium">
                      <FormLabel>Estádio</FormLabel>
                      <Input
                        type="text"
                        value={stadium}
                        onChange={handleStadiumChange}
                      />
                    </FormControl>
                  </HStack>

                  <Button
                    isDisabled={isSaving}
                    colorScheme="blue"
                    onClick={saveGames}
                  >
                    Salvar Partida
                  </Button>
                </VStack>
              </Center>
            </>
          ) : (
            <Center>
              <Text>
                Erro ao carregar o formulário. Por favor, tente novamente.
              </Text>
            </Center>
          )}

          {isSaving === true ? <Text>Salvando...</Text> : null}
          {isSave === true ? <Text>Salvo..</Text> : null}
          <br />
          <br />
          <Divider />
          <Center mt="50px">
            <Heading>Partidas Salvas</Heading>
          </Center>

          <Center mt="20px">
            <Box overflowX="auto" width="100%" maxWidth="900px">
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
                  {games.map((game) => (
                    <Tr key={game.id}>
                      <Td>
                        <HStack>
                          <Image
                            src={game.championship_logo}
                            alt={game.championship}
                            boxSize="50px"
                            objectFit="contain"
                          />
                          {/* <Text>{game.championship}</Text> */}
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
                            boxSize="30px"
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
                            boxSize="30px"
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
            </Box>
          </Center>
        </ChakraProvider>
      ) : (
        <Auth />
      )}
    </>
  );
}
