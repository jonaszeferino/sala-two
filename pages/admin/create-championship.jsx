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
  const [season, setSeason] = useState('');
  const [championship, setChampionship] = useState('');
  const [logo, setLogo] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [showCreateGames, setShowCreateGames] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSave, setIsSave] = useState(false);
  const [dataGame, setDataGame] = useState([]);

  const getChampionships = async () => {
    try {
      const response = await fetch(`/api/getChampionships`, {
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
    setIsLoading(true);
  }, []);

  const handleChampioship = (event) => {
    setChampionship(event.target.value);
  };

  const handleSeason = (event) => {
    setSeason(event.target.value);
  };

  const handleLogo = (event) => {
    setLogo(event.target.value);
  };

  useEffect(() => {}, [getChampionships, isSave]);

  const saveChampionships = () => {
    setIsSaving(true);
    setIsSave(false);

    const data = {
      name: championship,
      season: season,
      logo_image: logo,
    };

    fetch('/api/postChampionships', {
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

      <>
        <Center mt="60px" mb="20px">
          <Heading>Criar Campeonato</Heading>
        </Center>

        <Center ml="100px">
          <VStack spacing={4} align="stretch">
            <HStack spacing={4}>
              <FormControl id="championship">
                <FormLabel>Nome do Campeonado</FormLabel>
                <Input value={championship} onChange={handleChampioship} />
              </FormControl>

              <FormControl id="season">
                <FormLabel>Temporada</FormLabel>
                <Input type="text" value={season} onChange={handleSeason} />
              </FormControl>

              <FormControl id="logo">
                <FormLabel>Logo</FormLabel>
                <Input type="text" value={logo} onChange={handleLogo} />
              </FormControl>
        
        
            </HStack>

            <Button
              isDisabled={isSaving}
              colorScheme="blue"
              onClick={saveChampionships}
            >
              Salvar Partida
            </Button>
          </VStack>
        </Center>
      </>

      {isSaving === true ? <Text>Salvando...</Text> : null}
      {isSave === true ? <Text>Salvo..</Text> : null}
      <br />
      <br />
      <Divider />
      <Center mt="50px">
        <Heading>Campeonatos Salvos</Heading>
      </Center>

      <Center></Center>
    </ChakraProvider>
  );
}
