import Head from 'next/head';
import {
  ChakraProvider,
  Box,
  Text,
  Center,
  Heading,
  Card,
  Stack,
  CardBody,
  Button,
  Image,
  FormControl,
  Input,
} from '@chakra-ui/react';
import { Navbar } from '../components/Navbar';
import { Social } from '../components/Social';
import { useEffect, useState } from 'react';

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
        <Heading mt="200px">Jogos da Dupla Grenal</Heading>
      </Center>

      <Center>
        <Box borderRadius="10px">
          {isLoading ? (
            <Text>Carregando...</Text>
          ) : (
            data.map((item, index) => (
              <Card
                key={item.id}
                display="flex"
                overflow="hidden"
                variant="outline"
                style={{ margin: '10px' }}
                mt="120px"
                width="600px"
              >
                <Box mt="20px">
                  <Center>
                    <Text>{new Date(item.match_time).toLocaleString()}</Text>
                    <br />
                  </Center>
                </Box>

                <Box mt="2px">
                  <Center>
                    <Text>{item.stadium}</Text>
                    <br />
                  </Center>
                </Box>
                <Center></Center>
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
                      src="/path/to/home_team_image" // Substitua pelo caminho correto da imagem
                      alt="Imagem do Time de Casa"
                      loading="lazy"
                      ml="25px"
                      mt="25px"
                    />
                    <Stack>
                      <CardBody>
                        <Center>
                          <Text>{item.home_team}</Text>
                        </Center>
                      </CardBody>
                    </Stack>
                  </Box>

                  <FormControl id="homeTip" p="10px">
                    <Input
                      id={`homeTip_${index}`}
                      type="number"
                      value={item.score_home_team}
                      readOnly
                    />
                  </FormControl>

                  <Center>
                    <Heading>X</Heading>
                  </Center>
                  <FormControl id="awayTip" p="10px">
                    <Input
                      id={`awayTip_${index}`}
                      type="number"
                      value={item.score_away_team}
                      readOnly
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
                      src="/path/to/away_team_image" // Substitua pelo caminho correto da imagem
                      alt="Imagem do Time de Fora"
                      loading="lazy"
                      mr="25px"
                      mt="25px"
                    />
                    <Stack>
                      <CardBody>
                        <Center>
                          <Text>{item.away_team}</Text>
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
      <Social />
    </ChakraProvider>
  );
};

export default Tips;