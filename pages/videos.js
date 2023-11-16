import Head from 'next/head';
import {
  ChakraProvider,
  Box,
  Center,
  Heading,
  Card,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import { FaTwitter, FaYoutube, FaInstagram, FaTiktok } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';

export default function Home() {
  const [isLoading, setIsLoading] = useState([]);

  const data = {
    items: [
      {
        link: 'https://www.youtube.com/embed/nVEKzMDzzTU?si=CnCLquqFhEuIIQ0e',
      },
      {
        link: 'https://www.youtube.com/embed/HRLDg5v9oBM?si=mjwK3WLQ1so1520x',
      },
      {
        link: 'https://www.youtube.com/embed/1tv7JKV9Y-g?si=KrV2fep6S7CWFs38',
      },
      {
        link: 'https://www.youtube.com/embed/Nk71KJYXZww?si=d-tws98rrdX6TEzs',
      },
      {
        link: 'https://www.youtube.com/embed/hVzZLJ1pDKw?si=FtJ_9Xl_24aRQXeD',
      },
      {
        link: 'https://www.youtube.com/embed/3e771ly1dAQ?si=0mtzcwI7PNszpuiP',
      },
      {
        link: 'https://www.youtube.com/embed/gSlBiZqiIqY?si=vqARzmvkpNh_WsPO',
      },
      {
        link: 'https://www.youtube.com/embed/vP1ZNltLqfA?si=BKDW8WIcyeFJvfxt',
      },
      {
        link: 'https://www.youtube.com/embed/7LRAsjs_ujA?si=3TdMXmYeKtLerZR_',
      },
    ],
  };

  return (
    <ChakraProvider>
      <Head>
        <title>Sala de Secacao Videos</title>
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
        <Heading mt="200px">Videos com os Reacts da Dupla Grenal</Heading>
      </Center>

      <Box mt="20px" ml="250px" mb="250px" mr="250px" borderRadius="10px">
        <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={2}>
          {data.items.map((item, index) => (
            <GridItem key={index}>
              <Card overflow="hidden" variant="outline" mt="20px" p="10px">
                <iframe
                  width="100%"
                  height="360"
                  src={item.link}
                  title={`YouTube Video ${index + 1}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </Card>
            </GridItem>
          ))}
        </Grid>
      </Box>
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
    </ChakraProvider>
  );
}
