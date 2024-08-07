import Head from 'next/head';
import { Text, Center, Heading, Flex, Divider } from '@chakra-ui/react';
import { Navbar } from '../components/Navbar';
import { Social } from '../components/Social';
import Carousel from '../components/Carousel';

import YoutubeCarousel from '../components/YoutubeCarousel';
import HomeLeft from '../components/HomeLeft';
import HomeRight from '../components/HomeRight';

export default function Home() {
  return (
    <Flex direction="column">
      <Head>
        <title>Sala de Secacao</title>
        <meta name="description" content="Site do Sala de Secacao" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <Center flexDirection="column" gap="10px" mt="10px">
        <Heading>Acompanhe nossos Reacts</Heading>
        <YoutubeCarousel />

        <br />

        <Heading>Acompanhe as notícias e nossas colunas</Heading>
        <br/>

        <Flex maxWidth={1200}>
          <Flex width="590px">
            <HomeLeft />
          </Flex>
          <Divider orientation="vertical" m={5} />
          <Flex width="590px">
            <HomeRight />
          </Flex>
        </Flex>
      </Center>

      <Social />
    </Flex>
  );
}
