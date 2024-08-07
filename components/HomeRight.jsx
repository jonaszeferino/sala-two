import React, { useState, useEffect } from 'react';
import { Flex, IconButton, Box, Image, Text, Link } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';

const HomeRight = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('/api/articlesToSite');
        const data = await response.json();
        setArticles(data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === articles.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? articles.length - 1 : prevIndex - 1,
    );
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
  }, [currentIndex, articles]);

  const truncateHtml = (html, maxLength) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    let text = tempDiv.textContent || tempDiv.innerText || '';

    if (text.length > maxLength) {
      text = text.substring(0, maxLength) + '...';
    }

    const truncatedDiv = document.createElement('div');
    truncatedDiv.textContent = text;

    return truncatedDiv.innerHTML;
  };

  return (
    <Flex
      margin={2}
      alignItems="center"
      justifyContent="center"
      w="100%"
      maxW="600px"
      mx="auto"
      position="relative"
      height="600px"
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
      <Box
        w="100%"
        h="100%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <Flex overflow="hidden" borderRadius={20} h="100%">
          {articles.length > 0 &&
            articles.map((article, index) => (
              <Box
                key={article.id}
                flex="0 0 100%"
                p={0}
                display={index === currentIndex ? 'block' : 'none'}
                h="100%"
                flexDirection="column"
                justifyContent="center"
              >
                <NextLink href={`/pagina-do-artigo?id=${article.id}`} passHref>
                  <Image
                    src={article.image_link}
                    alt={article.article_title}
                    w="100%"
                    h="300px"
                    objectFit="cover"
                    borderRadius={20}
                    cursor="pointer"
                    marginTop={0}
                  />
                </NextLink>
                <Box p={4} flex="1">
                  <Text fontSize="xl" fontWeight="bold" maxWidth={590}>
                    {article.article_title}
                  </Text>
                  <Box pt="20px" w="100%">
                    <Text
                      dangerouslySetInnerHTML={{
                        __html: truncateHtml(article.article_main, 110),
                      }}
                      sx={{ textAlign: 'justify' }}
                    />
                  </Box>
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

export default HomeRight;
