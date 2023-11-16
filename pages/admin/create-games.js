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
} from '@chakra-ui/react';
import Sidebar from '../../components/Sidebar';
import { useState, useEffect } from 'react';

export default function PalpitesForm() {
  const [homeClub, setHomeClub] = useState('');
  const [awayClub, setAwayClub] = useState('');
  const [clubs, setClubs] = useState([]);
  const [date, setDate] = useState('');
  const [championship, setChampionship] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showCreateGames, setShowCreateGames] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSave, setIsSave] = useState(false);

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

  const handleSubmit = () => {
    console.log(`Palpite: Casa ${homeClub} x ${awayClub} Fora`);
  };

  const getClubs = async () => {
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
        console.log('Clubes retornados:', userData);
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
  };

  useEffect(() => {
    getClubs();
  }, []);

  const saveGames = () => {
    setIsSaving(true);
    setIsSave(false);

    const data = {
      home_club: homeClub,
      away_club: awayClub,
      date: date,
      championship: championship,
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
          <Center mt="50px" mb="50px">
            <Heading>Partidas</Heading>
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

                <FormControl id="switch">
                  <Stack direction="row">
                    <Switch colorScheme="teal" size="lg" />
                  </Stack>
                </FormControl>
              </HStack>

              <Button isDisabled={isSaving} colorScheme="blue" onClick={saveGames}>
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

      {isSaving === true ? <Text>Salvando...</Text>: null}
      {isSave === true ? <Text>Salvo..</Text>: null}

      <Center mt="150px">
        <Heading>Partidas Salvas</Heading>
      </Center>
    </ChakraProvider>
  );
}
