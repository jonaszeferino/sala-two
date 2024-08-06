import React, { useEffect, useState } from 'react';
import {
  ChakraProvider,
  Text,
  Center,
  Heading,
  Box,
  Tag,
  TagLabel,
} from '@chakra-ui/react';
import moment from 'moment-timezone';
import { Navbar } from '../components/Navbar';
import { useRouter } from 'next/router';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dataNews, setDataNews] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  const getNews = async (articleId) => {
    try {
      const response = await fetch(`/api/articlesToSite?id=${articleId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const dataRecive = await response.json();
        console.log('Dados do artigo:', dataRecive);
        setIsLoading(false);
        setDataNews(dataRecive);
      } else {
        setIsLoading(false);
        console.error('Erro ao buscar o artigo:', response.status);
      }
    } catch (error) {
      setIsLoading(false);
      console.error('Erro inesperado:', error);
    }
  };

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      getNews(id);
    }
  }, [id]);

  return (
    <>
      <ChakraProvider>
        <Navbar />
        <br />
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
              maxWidth={1200}
            >
              <Center>
                <Heading size="xl" maxWidth={1200}>{news.article_title}</Heading>
              </Center>
              <br />
              <Text mt={2}>
                Por: {news.reporter_name}
              </Text>
              <Text mt={2} mb={2}>
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
                <Text
                  maxWidth={1200}
                  mt={2}
                  dangerouslySetInnerHTML={{ __html: news.article_main }}
                  sx={{ textAlign: 'justify' }}
                />
              </Center>
              <br />
              <Center>
                {Array.isArray(news.article_tags) &&
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
                  ))}
              </Center>
            </Box>
          ))}
        </Center>
      </ChakraProvider>
    </>
  );
};

export default App;
