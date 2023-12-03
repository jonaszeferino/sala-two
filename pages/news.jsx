import {
  Flex,
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

import { Navbar } from '../components/Navbar';
import { Social } from '../components/Social';
import { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const News = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState([]);

  const getNews = async () => {
    try {
      const response = await fetch(`/api/external/news-api`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        const userData = await response.json();
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
    getNews();
    setIsLoading(true);
  }, []);

  if (data.length === 0 && !isLoading) {
    return (
      <Flex justify="center" align="center" h="100vh">
        <Heading>Sem notícias por agora...</Heading>
      </Flex>
    );
  }

  if (isLoading) {
    return (
      <Flex justify="center" align="center" h="100vh">
        <Heading>Carregando...</Heading>
      </Flex>
    );
  }

  return (
    <Flex direction="column" gap="40px" align="center">
      <Navbar />
      <Heading w="80%" textAlign="center">
        Notícias Externas da Dupla Grenal
      </Heading>
      <Flex direction="column" gap="20px" w={['80%']}>
        {data.map((item, index) => (
          <Card key={index} direction="row" overflow="hidden" variant="outline">
            <Stack direction={['column', 'row']} w="100%">
              <Image
                objectFit="cover"
                boxSize={['100%', '350px']}
                src={item.urlToImage}
                alt={item.title}
                loading="lazy"
              />

              <Stack w="100%">
                <CardBody>
                  <Heading fontSize="lg" textTransform="uppercase" w="100%">
                    {item.title ?? item.team}
                  </Heading>
                  <Text pt="20px" w="100%">
                    {item.description}
                  </Text>
                </CardBody>
                <CardFooter flexDirection="column" gap="10px" w="100%">
                  <Flex justify="space-between" w="100%">
                    <Text>Fonte: {item.source.name.toLowerCase()}</Text>
                    <Text>
                      {formatDistanceToNow(new Date(item.publishedAt), {
                        addSuffix: true,
                        locale: ptBR,
                      })}
                    </Text>
                  </Flex>
                  <Link href={item.url} isExternal w="100%">
                    <Button
                      w="100%"
                      variant="solid"
                      colorScheme={
                        item.team?.toLowerCase()?.includes('grêmio')
                          ? 'blue'
                          : item.title?.toLowerCase()?.includes('gre-nal') ||
                              item.url?.toLowerCase()?.includes('gre-nal')
                            ? 'linear-gradient(90deg, blue 50%, red 50%)'
                            : 'red'
                      }
                    >
                      Veja a notícia
                    </Button>
                  </Link>
                </CardFooter>
              </Stack>
            </Stack>
          </Card>
        ))}
      </Flex>
      <Social />
    </Flex>
  );
};

export default News;
