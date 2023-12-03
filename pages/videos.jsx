import {
  Flex,
  Center,
  Heading,
  Card,
  Grid,
  GridItem,
  Text,
} from '@chakra-ui/react';
import { Navbar } from '../components/Navbar';
import { Social } from '../components/Social';
import React from 'react';
import { useEffect, useState } from 'react';

const Videos = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState([true]);
  useEffect(() => {
    fetch('/api/getVideosNew')
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <Flex justify="center" align="center" h="100vh">
        <Heading>Carregando...</Heading>
      </Flex>
    );
  }

  return (
    <Flex direction="column" gap="40px">
      <Navbar />
      <Center>
        <Heading>Videos com os Reacts da Dupla Grenal</Heading>
      </Center>

      <Grid
        templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
        p="20px"
        gap="20px"
      >
        {data.map((item, index) => (
          <GridItem key={index}>
            <Center>
              <Heading>{item.video_title}</Heading>
            </Center>
            <Card overflow="hidden" variant="outline">
              <iframe
                width="100%"
                height="360px"
                src={item.video_link}
                title={`YouTube Video ${index + 1}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </Card>
          </GridItem>
        ))}
      </Grid>

      <Social />
    </Flex>
  );
};

export default Videos;
