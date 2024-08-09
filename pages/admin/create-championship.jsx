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
  Grid,
  Heading,
  Divider,
  Image,
} from '@chakra-ui/react';
import Sidebar from '../../components/Sidebar';
import { useState, useEffect } from 'react';
import LoggedUser from '../../components/LoggedUser';
import { supabase } from '../../utils/supabaseClientAdmin';
import Auth from '../../components/Auth';

export default function PalpitesForm() {
  const [season, setSeason] = useState('');
  const [championship, setChampionship] = useState('');
  const [logo, setLogo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSave, setIsSave] = useState(false);
  const [session, setSession] = useState(false);
  const [championships, setChampionships] = useState([]);

  useEffect(() => {
    let mounted = true;
    async function getInitialSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (mounted) {
        if (session) {
          setSession(session);
        }
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

  useEffect(() => {
    fetchChampionships();
  }, []);

  const fetchChampionships = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/championship');
      const data = await response.json();
      setChampionships(data);
    } catch (error) {
      console.error('Erro ao buscar campeonatos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChampioship = (event) => {
    setChampionship(event.target.value);
  };

  const handleSeason = (event) => {
    setSeason(event.target.value);
  };

  const handleLogo = (event) => {
    setLogo(event.target.value);
  };

  const saveChampionships = async () => {
    setIsSaving(true);
    setIsSave(false);

    const data = {
      name: championship,
      season: season,
      logo_image: logo,
    };

    try {
      const response = await fetch('/api/championship', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('Campeonato salvo com sucesso!');
        setIsSaving(false);
        setIsSave(true);
        fetchChampionships(); // Atualiza a lista de campeonatos
      } else {
        throw new Error('Falha ao salvar o campeonato');
      }
    } catch (error) {
      console.error('Erro ao salvar campeonato:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <Head>
        <title>Sala de Secacao</title>
        <meta name="description" content="Site do Sala de Secacao" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {session ? (
        <ChakraProvider>
          <Sidebar />
          <LoggedUser />

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

          <br />
          <br />
          <Grid
            templateColumns={{
              base: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(4, 1fr)',
              xl: 'repeat(5, 1fr)',
            }}
            gap={6}
            marginLeft="100px"
            marginRight="80px"
          >
            {!isLoading ? (
              championships.map((championship) => (
                <Box
                  key={championship.id}
                  borderWidth="1px"
                  borderRadius="lg"
                  p={4}
                  width="100%"
                  textAlign="center"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  flexDirection="column"
                  marginLeft="50px"
                  marginRight="10px"
                >
                  <Text fontWeight="bold">Campeonato {championship.name}</Text>
                  <Text>Temporada: {championship.season}</Text>
                  <Box boxSize="150px" marginTop="10px">
                    <Image
                      src={championship.logo_image}
                      alt={championship.name}
                      boxSize="100%"
                      objectFit="cover"
                    />
                  </Box>
                </Box>
              ))
            ) : (
              <Center mt="100px">
                <Text>Carregando...</Text>
              </Center>
            )}
          </Grid>
        </ChakraProvider>
      ) : (
        <Auth />
      )}
    </>
  );
}