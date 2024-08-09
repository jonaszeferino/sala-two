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
  Divider,
  Image,
  Heading,
  Grid,
} from '@chakra-ui/react';
import Sidebar from '../../components/Sidebar';
import { useState, useEffect } from 'react';
import LoggedUser from '../../components/LoggedUser';
import { supabase } from "../../utils/supabaseClientAdmin";
import Auth from "../../components/Auth";

export default function PalpitesForm() {
  const [clubName, setClubName] = useState('');
  const [completeName, setCompleteName] = useState('');
  const [logo, setLogo] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isSave, setIsSave] = useState(false);
  const [clubs, setClubs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [session, setSession] = useState(null);
  
  //user verify

  useEffect(() => {
    setIsLoading(true);
    fetchClubs(); // Fetch clubs on component mount
  }, []);

  const handleClubNameChange = (event) => {
    setClubName(event.target.value);
  };
  const handleCompleteNameChange = (event) => {
    setCompleteName(event.target.value);
  };
  const handleLogoChange = (event) => {
    setLogo(event.target.value);
  };

  const InsertClub = async () => {
    setIsSaving(true);

    try {
      await fetch('/api/clubs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: clubName,
          complete_name: completeName,
          logo_image: logo,
          country: 'Brasil', // Assuming country is always Brasil
        }),
      });

      setIsSaving(false);
      setIsSave(true);
      fetchClubs(); // Fetch clubs after inserting a new one

      return;
    } catch (error) {
      console.error(error);
      console.log('erro', error);
    }
  };

  const fetchClubs = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/clubs', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setClubs(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Botão Salvar clicado');
    await InsertClub();
  };

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

  return (
    <ChakraProvider>
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

          <Center mt="100px">
            <Heading as="h1" size="2xl">
              Times
            </Heading>
          </Center>
          <ChakraProvider>
            <Center mt="50px">
              <VStack spacing={4} align="stretch">
                <HStack spacing={4}>
                  <FormControl id="clubName">
                    <FormLabel>Nome do Time</FormLabel>
                    <Input value={clubName} onChange={handleClubNameChange} />
                  </FormControl>

                  <FormControl id="completeName">
                    <FormLabel>Nome Completo do Time</FormLabel>
                    <Input value={completeName} onChange={handleCompleteNameChange} />
                  </FormControl>

                  <FormControl id="logo">
                    <FormLabel>Link da Imagem</FormLabel>
                    <Input
                      value={logo}
                      type="text"
                      onChange={handleLogoChange}
                    />
                  </FormControl>
                </HStack>

                <Button colorScheme="blue" onClick={handleSubmit}>
                  Salvar Time
                </Button>
              </VStack>
            </Center>
          </ChakraProvider>

          <br />
          <br />
          <br />

          <Divider />
          <br />
          <br />

          <ChakraProvider>
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
              marginLeft="100px" // Margem à esquerda
              marginRight="80px" // Margem à direita
            >
              {!isLoading ? (
                clubs.map((club) => (
                  <Box
                    key={club.id}
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
                    <Text fontWeight="bold">Time: {club.name}</Text>
                    <Text>{club.complete_name}</Text>
                    <Text>{club.country}</Text>
                    <Box boxSize="150px" marginTop="10px">
                      <Image
                        src={club.logo_image}
                        alt={club.name}
                        boxSize="100%"
                        objectFit="cover"
                      />
                    </Box>
                  </Box>
                ))
              ) : (
                <Center mt="100px">
                  <Text>Loading...</Text>
                </Center>
              )}
            </Grid>
          </ChakraProvider>
        </ChakraProvider>
      ) :  <Auth /> }
    </ChakraProvider>
  );
}