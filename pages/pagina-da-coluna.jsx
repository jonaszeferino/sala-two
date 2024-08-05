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
  TagLabel,
  Button
} from '@chakra-ui/react';
import moment from 'moment-timezone';
import { Navbar } from '../components/Navbar';
import { Social } from '../components/Social';

const App = () => {
  const [isLoading, setIsLoading] = useState('');
  const [dataNews, setDataNews] = useState([]);
  const [id, setId] = useState('');
  const [tags, setTags] = useState('');

  const getNews = async () => {
    try {
      const response = await fetch(`/api/articlesToSite?=15`, {
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
   
       <br />
       <br />
       <br />
          {dataNews.map((news) => (
            <Box
              key={news.id}
              p={4}
              borderWidth="1px"
              borderRadius="md"
              mb={4}
              shadow="sm"
            >
              <Center>
                <Heading size="xl">{news.article_title}</Heading>
              </Center>
              <br />
              <Text ml={15} mt={2}>Por: {news.reporter_name}</Text>
              <Text ml={15} mt={2} mb={2}>
                Data: {moment(news.publicated_date).format('DD/MM/YYYY')}
              </Text>
              <Center>
                <br />
                <Box
                  as="img"
                  src={news.image_link}
                  alt={news.article_title}
                  borderRadius="md"
                  width={'1200px'}
                  objectFit="cover"
                  mb={2}
                />
              </Center>
              <Center>
              <Text maxWidth={1200}
                mt={2}
                dangerouslySetInnerHTML={{ __html: news.article_main }}
                sx={{ textAlign: 'justify' }}
              />
              </Center>
              <br/>
              <Center>
                {(Array.isArray(news.article_tags) &&
                  news.article_tags.length > 0 &&
                  news.article_tags.map((tag) => (
                    <Tag
                      key={tag.label}
                      colorScheme={tag.color}
                      borderRadius="full"
                      mx={1}
                    >
                      <TagLabel>{tag.label}</TagLabel>
                    </Tag>
                  ))) || <Text></Text>}
              </Center>

    
            </Box>
          ))}
        </Center>
      </ChakraProvider>
    </>
  );
};

export default App;
