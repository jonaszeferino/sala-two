import React, { useEffect, useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import {
  ChakraProvider,
  Text,
  Center,
  Heading,
  Box,
  Flex,
  Tag,
  HStack,
} from '@chakra-ui/react';
import moment from 'moment-timezone';
import { Navbar } from '../components/Navbar';
import { Social } from '../components/Social';

const App = () => {
  const [isLoading, setIsLoading] = useState('');
  const [dataNews, setDataNews] = useState([]);
  const [tags, setTags] = useState('');

  const getNews = async () => {
    try {
      const response = await fetch(`/api/getNews`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const dataRecive = await response.json();
        console.log('Dados do usuário:', dataRecive);
        setIsLoading(false);
        setDataNews(dataRecive);
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
    <>
      <ChakraProvider>
        <Navbar />

        <Center>
          <Box mt="100px" mb="50px">
            {isLoading ? (
              <Text>Carregando...</Text>
            ) : (
              dataNews.map((item, index) => (
                <Box key={index} bg="gray.250" p="10px">
                  <Center>
                    <Heading bg="gray.250">{item.title}</Heading>
                  </Center>

                  <Flex justifyContent="space-between" alignItems="center">
                    <Text ml="0px">{item.jornalist_name}</Text>
                    <Text mr="0px">
                      {moment(item.created_at)
                        .tz('America/Sao_Paulo')
                        .format('DD/MM/YYYY HH:mm:ss')}
                    </Text>
                  </Flex>
                  <br />

                  <Center>
                    <Box bg="gray.200" p={4}>
                      <Text dangerouslySetInnerHTML={{ __html: item.news }} />
                    </Box>
                  </Center>
                  <br />
                  <br />

                  <HStack spacing={2}>
                    {item.tags &&
                      item.tags.map((tag, tagIndex) => (
                        <Tag
                          key={tagIndex}
                          variant="solid"
                          colorScheme={tag.color.toLowerCase()}
                        >
                          {tag.label}
                        </Tag>
                      ))}
                  </HStack>
                </Box>
              ))
            )}
          </Box>
        </Center>
      </ChakraProvider>
    </>
  );
};

export default App;
