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
} from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import { FaTwitter, FaYoutube, FaInstagram, FaTiktok } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';

export default function Home() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState([]);

  const getNews = async () => {
    try {
      const response = await fetch(`/api/external/newsApi`, {
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
    getNews();
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
        <Heading mt="200px">Notícias Externas da Dupa Grenal</Heading>
      </Center>
      <Box mt="20px" ml="250px" mr="250px" borderRadius="10px">
        {data.map((item, index) => (
          <Card
            key={index}
            direction={{ base: 'column', sm: 'row' }}
            overflow="hidden"
            variant="outline"
            style={{ margin: '10px' }}
            mt="120px"
          >
            <Image
              objectFit="cover"
              maxW={{ base: '100%', sm: '350px' }}
              boxSize="350px"
              borderRadius="10px"
              src={item.urlToImage}
              alt="Imagem da Noticia"
              loading="lazy"
            />

            <Stack>
              <CardBody>
                <Heading size="md">{item.title}</Heading>
                <Text py="2">{item.description}</Text>
                <Text>{item.content.slice(0, 100)}....</Text>

                <Text></Text>
                <br />
                <Text>
                  Fonte: {item.source.name}{' '}
                  {item.publishedAt
                    ? format(new Date(item.publishedAt), 'dd/MM/yyyy')
                    : ''}{' '}
                </Text>
              </CardBody>
              <CardFooter>
                {(item.title &&
                  (item.title.includes('Gremio') ||
                    item.title.includes('Grêmio'))) ||
                (item.url &&
                  (item.url.includes('Gremio') ||
                    item.url.includes('Grêmio'))) ||
                (item.author &&
                  (item.author.includes('Gremio') ||
                    item.author.includes('Grêmio'))) ||
                (item.description &&
                  (item.description.includes('Gremio') ||
                    item.description.includes('Grêmio'))) ? (
                  <Button variant="solid" colorScheme="blue">
                    <Link href={item.url} target="_blank">
                      Veja a notícia
                    </Link>
                  </Button>
                ) : (
                  <Button variant="solid" colorScheme="red">
                    <Link href={item.url} target="_blank">
                      Veja a Notícia
                    </Link>
                  </Button>
                )}
              </CardFooter>
            </Stack>
          </Card>
        ))}

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
      </Box>
      {/* <div>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5165191224568168"
          crossOrigin="anonymous"
        ></script>
      </div> */}
    </ChakraProvider>
  );
}
