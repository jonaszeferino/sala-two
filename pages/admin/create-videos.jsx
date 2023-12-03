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
import { useState, useEffect, React } from 'react';

export default function PalpitesForm() {
  const [videoTitle, setVideoTitle] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const [isSaving, setIsSaving] = useState('');
  const [isSave, setIsSave] = useState('');
  const [clubs, setClubs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [data, setData] = useState([]);

  const handlePlatformChange = (event) => {
    setSelectedPlatform(event.target.value);
  };

  const handleVideoTitleChange = (event) => {
    setVideoTitle(event.target.value);
  };

  const handleVideoLinkChange = (event) => {
    const inputText = event.target.value;
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = inputText.match(regex);

    if (match) {
      const videoID = match[1];
      const youtubeURL = `https://www.youtube.com/embed/${videoID}`;
      setVideoLink(youtubeURL);
    } else {
      setVideoLink(inputText);
    }
  };

  const InsertVideo = async () => {
    setIsSaving(true);
    console.log('Chamou!');

    try {
      await fetch('/api/postVideos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          video_title: videoTitle,
          video_link: videoLink,
          social_type: selectedPlatform,
        }),
      });

      setIsSaving(false);
      setIsSave(true);
      return;
    } catch (error) {
      console.error(error);
      console.log('erro', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Botão Salvar clicado');
    await InsertVideo();
  };

  const getVideos = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/getVideosNew`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const userData = await response.json();
        console.log('Clubes retornados:', userData);
        setIsLoading(false);
        setData(userData);
      } else {
        if (response.status === 404) {
          setIsLoading(false);
        }
        console.error('Erro ao buscar videos:', response.status);
      }
    } catch (error) {
      console.error('Erro inesperado:', error);
    }
  };

  useEffect(() => {
    getVideos();
  }, [isSave]);

  return (
    <ChakraProvider>
      <Head>
        <title>Inserir Videos</title>
        <meta name="description" content="Site do Sala de Secacao" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {isSaving ? <Text>Salvando</Text> : isSave ? <Text>Salvo</Text> : null}

      <Sidebar />

      <Center mt="100px">
        <Heading as="h1" size="2xl">
          Adicionar Videos
        </Heading>
      </Center>
      <ChakraProvider>
        <Center mt="50px">
          {' '}
          <VStack spacing={4} align="stretch">
            <HStack spacing={4}>
              <FormControl id="clubName">
                <FormLabel>Nome do Video</FormLabel>
                <Input value={videoTitle} onChange={handleVideoTitleChange} />
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
                <FormLabel>Link do Video</FormLabel>{' '}
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
                  <strong>{item.video_title}</strong>
                </Center>
              </Heading>
              <Card overflow="hidden" variant="outline">
                {item.video_link ? (
                  <iframe
                    width="100%"
                    height="360px"
                    src={item.video_link}
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
  );
}
