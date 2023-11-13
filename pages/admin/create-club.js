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
  Divider,
  Image,
  Heading,
  Grid,
} from "@chakra-ui/react";

import Sidebar from "../../components/Sidebar";

import { useState, useEffect } from "react";

export default function PalpitesForm() {
  const [clubName, setClubName] = useState("");
  const [logo, setLogo] = useState("");
  const [saving, setIsSaving] = useState("");
  const [save, setIsSave] = useState("");
  const [clubs, setClubs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getClubs();
    setIsLoading(true);
  }, []);
  const handleClubNameChange = (event) => {
    setClubName(event.target.value);
  };
  const handleLogoChange = (event) => {
    setLogo(event.target.value);
  };
  const InsertClub = async () => {
    setIsSaving(true);

    try {
      const response = await fetch("/api/postClubs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          club_name: clubName,
          logo_name: logo,
        }),
      });

      setIsSaving(false);
      setIsSave(true);

      return;
    } catch (error) {
      console.error(error);
      console.log("erro", error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Botão Salvar clicado");
    await InsertClub();
    getClubs();
  };

  //Get
  const getClubs = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/getClubs`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const userData = await response.json();
        console.log("Clubes retornados:", userData);
        setIsLoading(false);
        setClubs(userData);
      } else {
        if (response.status === 404) {
          setIsLoading(false);
          setNewUser(true);
        }
        console.error("Erro ao buscar o usuário:", response.status);
      }
    } catch (error) {
      console.error("Erro inesperado:", error);
    }
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

      <Center mt="100px">
        <Heading as="h1" size="2xl">
          Times
        </Heading>
      </Center>
      <ChakraProvider>
        <Center mt="50px">
          {" "}
          {/* Adicionando margem no topo */}
          <VStack spacing={4} align="stretch">
            <HStack spacing={4}>
              <FormControl id="clubName">
                <FormLabel>Nome do Time</FormLabel>
                <Input value={clubName} onChange={handleClubNameChange} />
              </FormControl>

              <FormControl id="logo">
                <FormLabel>Link da Imagem</FormLabel>
                <Input value={logo} type="text" onChange={handleLogoChange} />
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
      <ChakraProvider>
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
            xl: "repeat(5, 1fr)",
          }}
          gap={6}
          marginLeft="100px" // Margem à esquerda
          marginRight="80px" // Margem à direita
        >
          {!isLoading ? (
            clubs.map((club) => (
              <Box
                key={club._id}
                borderWidth="1px"
                borderRadius="lg"
                p={4}
                width="100%" // Ocupa toda a largura da coluna
                textAlign="center"
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                marginLeft="50px" // Margem interna à esquerda
                marginRight="10px" // Margem interna à direita
              >
                <Text fontWeight="bold">Time: {club.club_name}</Text>
                <Box boxSize="150px" marginTop="10px">
                  <Image
                    src={club.logo_name}
                    alt="Club Name"
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
  );
}
