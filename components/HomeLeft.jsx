import React, { useState, useEffect } from 'react';
import { Flex, IconButton, Box, Image, Text, Link } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const HomeLeft = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('/api/external/news-api');
        const data = await response.json();
        setNews(data);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === news.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? news.length - 1 : prevIndex - 1));
  };

  useEffect(() => {
    let timerId;

    const startTimer = () => {
      timerId = setTimeout(() => {
        nextSlide();
      }, 10000);
    };

    const stopTimer = () => {
      clearTimeout(timerId);
    };

    startTimer();

    return () => {
      stopTimer();
    };
  }, [currentIndex, news]);

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      w="100%"
      maxW="600px"
      mx="auto"
      position="relative"
      height="600px" // Altura fixa
    >
      <IconButton
        aria-label="Previous Slide"
        icon={<ChevronLeftIcon />}
        onClick={prevSlide}
        position="absolute"
        left="0"
        top="25%"
        transform="translateY(-50%)"
        zIndex="1"
        fontSize="40px"
      />
      <Box w="100%" h="100%" display="flex" flexDirection="column" justifyContent="center">
        <Flex overflow="hidden" borderRadius={20} h="100%">
          {news.length > 0 &&
            news.map((article, index) => (
              <Box
                key={article.url}
                flex="0 0 100%"
                p={0}
                display={index === currentIndex ? 'block' : 'none'}
                h="100%"
                flexDirection="column"
                justifyContent="center"
              >
                <Link href={article.url} isExternal>
                  <Image
                    src={article.urlToImage}
                    alt={article.title}
                    w="100%"
                    h="300px"
                    objectFit="cover"
                    borderRadius={20}
                    marginTop={0}
                  />
                </Link>
                <Box p={4} flex="1">
                  <Text fontSize="xl" fontWeight="bold">{article.title}</Text>
                  <Text>{article.description}</Text>
                </Box>
              </Box>
            ))}
        </Flex>
      </Box>
      <IconButton
        aria-label="Next Slide"
        icon={<ChevronRightIcon />}
        onClick={nextSlide}
        position="absolute"
        right="0"
        top="25%"
        transform="translateY(-50%)"
        zIndex="1"
        fontSize="40px"
      />
    </Flex>
  );
};

export default HomeLeft;
