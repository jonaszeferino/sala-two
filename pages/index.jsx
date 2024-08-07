import Head from 'next/head';
import {
  Center,
  Heading,
  Flex,
  Divider,
  useMediaQuery,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { Navbar } from '../components/Navbar';
import { Social } from '../components/Social';
import YoutubeCarousel from '../components/YoutubeCarousel';
import YoutubeCarouselMobile from '../components/YoutubeCarouselMobile';
import HomeLeft from '../components/HomeLeft';
import HomeRight from '../components/HomeRight';

export default function Home() {
  const [isMobile] = useMediaQuery('(max-width: 768px)');

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
        {isMobile ? <YoutubeCarouselMobile /> : <YoutubeCarousel />}
        <br />
        <Heading>Acompanhe as notícias e nossas colunas</Heading>
        <br />

        {isMobile ? (
          <VStack>
            <HomeLeft margin={2} />
            <HomeRight margin={2} />
          </VStack>
        ) : (
          <Flex maxWidth={1200}>
            <Flex width="590px">
              <HomeLeft />
            </Flex>
            <Divider orientation="vertical" m={5} />
            <Flex width="590px">
              <HomeRight />
            </Flex>
          </Flex>
        )}
      </Center>

      <Social />
    </Flex>
  );
}
