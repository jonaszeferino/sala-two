import Head from 'next/head';
import {
  ChakraProvider,
  Box,
  Text,
  Center,
  Heading,
  Card,
  CardFooter,
  Stack,
  CardBody,
  Button,
  Image,
  Link,
  Spacer,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import { FaTwitter, FaYoutube, FaInstagram, FaTiktok } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import SocialLinks from '../components/SocialLink';

export default function Home() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState([]);

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
        setData(userData);
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
    console.log('Chamou o useEffect');
    getGames();
    setIsLoading(true);
  }, []);

  return (
    <ChakraProvider>
      <Head>
        <title>Sala de Secacao</title>
        <meta name="description" content="Site do Sala de Secacao" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        {/* Meta tags para Open Graph (Facebook) */}
        <meta property="og:title" content="Sala de Secacao" />
        <meta property="og:description" content="Site do Sala de Secacao" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="URL_DA_IMAGEM_PARA_COMPARTILHAMENTO"
        />
        <meta property="og:url" content="URL_DA_PAGINA" />

        {/* Meta tags para Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Sala de Secacao" />
        <meta name="twitter:description" content="Site do Sala de Secacao" />
        <meta name="twitter:image" content="URL_DA_IMAGEM_PARA_TWITTER" />
      </Head>

      <Navbar />
      <Center>
        <Heading mt="200px">Palpites Dupla Grenal</Heading>
      </Center>
      <Center>
        <Box borderRadius="10px">
          {isLoading ? (
            <Text>Carregando...</Text>
          ) : (
            data.map((item, index) => (
              <Card
                key={index}
                display="flex"
                overflow="hidden"
                variant="outline"
                style={{ margin: '10px' }}
                mt="120px"
                width="600px"
              >
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
                    {' '}
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
                    <Input type="number" />
                  </FormControl>

                  <Center>
                    <Heading>X</Heading>
                  </Center>

                  <FormControl id="clubName" p="10px">
                    <Input type="number" />
                  </FormControl>

                  <Box
                    textAlign={{ base: 'center', md: 'right' }}
                    ml={{ base: '0', md: '4' }}
                  >
                    {' '}
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

      <Box pt="72px" p="20px">
        {' '}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <a
            href="https://twitter.com/Saladesecacao"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: '50px', padding: '20px' }}
          >
            <FaTwitter />
          </a>

          <a
            href="https://www.youtube.com/@SaladeSecacao"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: '50px', padding: '20px' }}
          >
            <FaYoutube />
          </a>
          <a
            href="https://www.instagram.com/saladesecacao/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: '50px', padding: '20px' }}
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.tiktok.com/@saladeseca?lang=pt-BR"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: '50px', padding: '20px' }}
          >
            <FaTiktok />
          </a>
        </div>
      </Box>
    </ChakraProvider>
  );
}
