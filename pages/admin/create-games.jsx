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
  Switch,
  Stack,
  Heading,
  Select,
  Divider,
  Card,
  CardBody,
  Image,
} from '@chakra-ui/react';
import Sidebar from '../../components/Sidebar';
import { useState, useEffect, useCallback } from 'react';

export default function PalpitesForm() {
  const [homeClub, setHomeClub] = useState('');
  const [awayClub, setAwayClub] = useState('');
  const [round, setRound] = useState('');
  const [clubs, setClubs] = useState([]);
  const [date, setDate] = useState('');
  const [championship, setChampionship] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showCreateGames, setShowCreateGames] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSave, setIsSave] = useState(false);
  const [dataGame, setDataGame] = useState([]);

  const getGames = async () => {
    try {
      const response = await fetch(`/api/getGames`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const userData = await response.json();
        console.log('Dados do usuário:', userData);
        setIsLoading(false);
        setDataGame(userData);
      } else {
        if (response.status === 404) {
          setIsLoading(false);
        }
        console.error('Erro ao buscar o usuário:', response.status);
      }
    } catch (error) {
      console.error('Erro inesperado:', error);
    }
  };

  useEffect(() => {
    getGames();
    setIsLoading(true);
  }, []);

  const handleHomeClubChange = (event) => {
    setHomeClub(event.target.value);
  };

  const handleAwayClubChange = (event) => {
    setAwayClub(event.target.value);
  };

  const handleChampioship = (event) => {
    setChampionship(event.target.value);
  };

  const handleRoundChange = (event) => {
    setRound(event.target.value);
  };

  const handleDate = (event) => {
    setDate(event.target.value);
  };

  const getClubs = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/getClubs`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const userData = await response.json();
        setClubs(userData);
        setShowCreateGames(true);
        console.log(showCreateGames);
      } else {
        if (response.status === 404) {
          console.error('Erro ao buscar os clubes:', response.status);
        }
      }
    } catch (error) {
      console.error('Erro inesperado:', error);
    }
  }, [showCreateGames]);

  useEffect(() => {
    getClubs();
  }, [getClubs, isSave]);

  const saveGames = () => {
    setIsSaving(true);
    setIsSave(false);

    const data = {
      home_club: homeClub,
      away_club: awayClub,
      date: date,
      championship: championship,
      round: round
    };

    fetch('/api/postGames', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        console.log('Jogo Salo Com Sucesso!', response);

        setIsSaving(false);
        setIsSave(true);
      })
      .catch((error) => {
        console.error('Erro ao salvar notícia:', error);
      });
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
      {showCreateGames === true ? (
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
                    {clubs.map((club) => (
                      <option key={club._id} value={club.club_name}>
                        {club.club_name}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl id="awayClub">
                  <FormLabel>Fora de Casa</FormLabel>
                  <Select value={awayClub} onChange={handleAwayClubChange}>
                    {clubs.map((club) => (
                      <option key={club._id} value={club.club_name}>
                        {club.club_name}
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
                  <Input
                    type="text"
                    value={championship}
                    onChange={handleChampioship}
                  />
                </FormControl>


                <FormControl id="round">
                  <FormLabel>Rodada</FormLabel>
                  <Input
                    type="text"
                    value={round}
                    onChange={handleRoundChange}
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
          <Text>Aguarde, tela carregando </Text>
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

      <Center>
        <Box borderRadius="10px">
          {isLoading ? (
            <Text>Carregando...</Text>
          ) : (
            dataGame.map((item, index) => (
              <Card
                key={index}
                display="flex"
                overflow="hidden"
                variant="outline"
                style={{ margin: '10px' }}
                mt="120px"
                width="600px"
              >
                <Box mt="20px">
                  <Center>
                    <Text>{item.date}</Text>
                    <br />
                  </Center>
                </Box>

                <Box mt="20px">
                  <Center>
                    <Text>Rodada:{item.round}</Text>
                    <br />
                  </Center>
                </Box>

                <Box mt="2px">
                  <Center>
                    <Text>{item.championship}</Text>
                    <br />
                  </Center>
                </Box>
                <Center>
                  <Box>
                    <FormControl id="switch">
                      <Switch colorScheme="teal" size="lg" />
                    </FormControl>
                  </Box>
                </Center>
                <Box
                  display="flex"
                  flexDirection={{ base: 'column', md: 'row' }}
                  justifyContent={{ base: 'center', md: 'space-between' }}
                  alignItems="center"
                  width="600px"
                >
                  <Box
                    textAlign={{ base: 'center', md: 'left' }}
                    mb={{ base: '4', md: '0' }}
                  >
                    <Image
                      objectFit="cover"
                      maxW={{ base: '100%', sm: '150px' }}
                      boxSize="150px"
                      borderRadius="10px"
                      src={item.homeClubData}
                      alt="Imagem do Time de Casa"
                      loading="lazy"
                      ml="25px"
                      mt="25px"
                    />
                    <Stack>
                      <CardBody>
                        <Center>
                          <Text>{item.home_club}</Text>
                        </Center>
                      </CardBody>
                    </Stack>
                  </Box>

                  <FormControl id="clubName" p="10px">
                    <Input
                      id={`homeTip_${index}`}
                      type="number"
                      value={item.homeTip}
                    />
                  </FormControl>

                  <Center>
                    <Heading>X</Heading>
                  </Center>

                  <FormControl id="clubName" p="10px">
                    <Input
                      id={`awayTip_${index}`}
                      type="number"
                      value={item.awayTip}
                    />
                  </FormControl>

                  <Box
                    textAlign={{ base: 'center', md: 'right' }}
                    ml={{ base: '0', md: '4' }}
                  >
                    <Image
                      objectFit="cover"
                      maxW={{ base: '100%', sm: '150px' }}
                      boxSize="150px"
                      borderRadius="10px"
                      src={item.awayClubData}
                      alt="Imagem do Time de Fora"
                      loading="lazy"
                      mr="25px"
                      mt="25px"
                    />
                    <Stack>
                      <CardBody>
                        <Center>
                          <Text>{item.away_club}</Text>
                        </Center>
                      </CardBody>
                    </Stack>
                  </Box>
                </Box>
              </Card>
            ))
          )}
        </Box>
      </Center>
    </ChakraProvider>
  );
}
