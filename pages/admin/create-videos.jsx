import Head from 'next/head';
import {
  ChakraProvider,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Center,
  HStack,
  Divider,
  Heading,
  Tooltip,
  Select,
  Grid,
  GridItem,
  Card,
  Text,
  Box,
} from '@chakra-ui/react';
import Sidebar from '../../components/Sidebar';
import { useState, useEffect } from 'react';
import LoggedUser from '../../components/LoggedUser';
import { supabase } from '../../utils/supabaseClientAdmin';
import Auth from '../../components/Auth';

export default function PalpitesForm() {
  const [videoTitle, setVideoTitle] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isSave, setIsSave] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [data, setData] = useState([]);
  const [session, setSession] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function getInitialSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (mounted) {
        if (session) {
          setSession(session);
        }
      }
    }
    getInitialSession();
    const { subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      },
    );
    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  const handlePlatformChange = (event) => {
    setSelectedPlatform(event.target.value);
  };

  const handleVideoTitleChange = (event) => {
    setVideoTitle(event.target.value);
  };

  const handleVideoLinkChange = (event) => {
    setVideoLink(event.target.value);
  };

  const getYoutubeEmbedUrl = (url) => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    if (match) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
    return url;
  };

  const InsertVideo = async () => {
    setIsSaving(true);

    try {
      await fetch('/api/social', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          link: getYoutubeEmbedUrl(videoLink),
          title: videoTitle,
          social_type: selectedPlatform,
        }),
      });

      setIsSaving(false);
      setIsSave(true);
    } catch (error) {
      console.error('erro', error);
      setIsSaving(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await InsertVideo();
  };

  const getVideos = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/social`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const userData = await response.json();
        setData(userData);
      } else {
        console.error('Erro ao buscar videos:', response.status);
      }
    } catch (error) {
      console.error('Erro inesperado:', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getVideos();
  }, [isSave]);

  return (
    <>
      <Head>
        <title>Inserir Videos</title>
        <meta name="description" content="Site do Sala de Secacao" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {session ? (
        <ChakraProvider>
          {isSaving ? (
            <Text>Salvando</Text>
          ) : isSave ? (
            <Text>Salvo</Text>
          ) : null}

          <Sidebar />
          <LoggedUser />

          <Center mt="100px">
            <Heading as="h1" size="2xl">
              Adicionar Videos
            </Heading>
          </Center>
          <ChakraProvider>
            <Center mt="50px">
              <VStack spacing={4} align="stretch">
                <HStack spacing={4}>
                  <FormControl id="videoTitle">
                    <FormLabel>Nome do Video</FormLabel>
                    <Input
                      value={videoTitle}
                      onChange={handleVideoTitleChange}
                    />
                  </FormControl>

                  <FormControl id="platform">
                    <FormLabel>Plataforma</FormLabel>
                    <Select
                      placeholder="Selecione a plataforma"
                      value={selectedPlatform}
                      onChange={handlePlatformChange}
                    >
                      <option value="youtube">YouTube</option>
                      <option value="tiktok">TikTok(em desenvolvimento)</option>
                      <option value="instagram">
                        Instagram(em desenvolvimento)
                      </option>
                    </Select>
                  </FormControl>
                </HStack>
                {selectedPlatform ? (
                  <FormControl id="videoLink">
                    <FormLabel>Link do Video</FormLabel>
                    <HStack>
                      <Tooltip
                        label="Clique no vídeo em compartilhar e depois em incorporar. Copie o link inteiro."
                        placement="right"
                      >
                        <Input
                          value={videoLink}
                          type="text"
                          onChange={handleVideoLinkChange}
                        />
                      </Tooltip>
                    </HStack>
                  </FormControl>
                ) : null}

                <Button colorScheme="blue" onClick={handleSubmit}>
                  Salvar Video
                </Button>
              </VStack>
            </Center>
          </ChakraProvider>

          <br />
          <br />
          <br />

          <Divider />
          <br />
          <br />
          <br />
          <Center>
            <Heading>Videos Salvos</Heading>
          </Center>

          <Grid
            templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
            p="20px"
            gap="20px"
            ml="100px"
            mr="50px"
          >
            {data &&
              data.map((item, index) => (
                <GridItem key={index}>
                  <Heading>
                    <Center>
                      <strong>{item.title}</strong>
                    </Center>
                  </Heading>
                  <Card overflow="hidden" variant="outline">
                    {item.link ? (
                      <iframe
                        width="100%"
                        height="360px"
                        src={item.link}
                        title={`YouTube Video ${index + 1}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <p>Link não disponível</p>
                    )}
                  </Card>
                </GridItem>
              ))}
          </Grid>
        </ChakraProvider>
      ) : (
        <Auth />
      )}
    </>
  );
}
