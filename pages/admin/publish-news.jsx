import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Sidebar from '../../components/Sidebar';
import {
  ChakraProvider,
  Button,
  Text,
  Heading,
  Box,
  Flex,
  useToast,
  FormControl,
  FormLabel,
  Input,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogCloseButton,
} from '@chakra-ui/react';
import moment from 'moment-timezone';
import LoggedUser from '@/components/LoggedUser';
import Auth from '../../components/Auth';
import { supabase } from "../../utils/supabaseClientAdmin";

const App = () => {
  const [dataNews, setDataNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [dateTime, setDateTime] = useState({});
  const [visibility, setVisibility] = useState({});
  const [deleteNewsId, setDeleteNewsId] = useState(null); // ID da notícia a ser deletada
  const [isOpen, setIsOpen] = useState(false); // Estado para o modal
  const toast = useToast();
  const cancelRef = React.useRef();
  const [session,setSession] = useState(false)

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

  const getNews = async () => {
    try {
      const response = await fetch(`/api/articles`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const dataRecive = await response.json();
        setIsLoading(false);
        setDataNews(dataRecive);

        const initialDateTimes = {};
        const initialVisibility = {};
        dataRecive.forEach((news) => {
          initialDateTimes[news.id] = moment(news.publicated_date).format(
            'YYYY-MM-DDTHH:mm',
          );
          initialVisibility[news.id] = news.is_visible;
        });
        setDateTime(initialDateTimes);
        setVisibility(initialVisibility);
      } else {
        if (response.status === 404) {
          setIsLoading(false);
        }
        console.error('Erro ao buscar notícias:', response.status);
      }
    } catch (error) {
      console.error('Erro inesperado:', error);
    }
  };

  useEffect(() => {
    getNews();
    setIsLoading(true);
  }, [toast]);

  const handleDeleteNews = async () => {
    if (deleteNewsId === null) return;

    setIsDeleting(true);
    try {
      const response = await fetch('/api/articles', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ news_id: deleteNewsId }),
      });

      if (response.ok) {
        setIsDeleting(false);
        getNews();
        toast({
          title: 'Notícia excluída.',
          description: 'A notícia foi excluída com sucesso.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        setIsOpen(false); // Fecha o modal
      } else {
        setIsDeleting(false);
        console.error('Erro ao excluir notícia:', response.status);
        toast({
          title: 'Erro ao excluir.',
          description: 'Ocorreu um erro ao excluir a notícia.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      setIsDeleting(false);
      console.error('Erro inesperado:', error);
      toast({
        title: 'Erro inesperado.',
        description: 'Ocorreu um erro inesperado ao excluir a notícia.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleOpenDeleteModal = (news_id) => {
    setDeleteNewsId(news_id);
    setIsOpen(true);
  };

  const handleChange = (news_id, e) => {
    const newDateTime = e.target.value;
    setDateTime((prevDateTime) => ({
      ...prevDateTime,
      [news_id]: newDateTime,
    }));
  };

  const handleVisibilityChange = async (news_id, isVisible) => {
    try {
      const response = await fetch('/api/articlesPublish', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: news_id,
          is_visible: isVisible,
          publicated_date: dateTime[news_id],
        }),
      });

      if (response.ok) {
        const result = await response.json();
        toast({
          title: 'Visibilidade atualizada.',
          description: 'A visibilidade foi atualizada com sucesso.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        setVisibility((prevVisibility) => ({
          ...prevVisibility,
          [news_id]: isVisible,
        }));
        getNews();
      } else {
        console.error('Erro ao atualizar visibilidade:', response.status);
        toast({
          title: 'Erro ao atualizar.',
          description: 'Ocorreu um erro ao atualizar a visibilidade.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Erro inesperado:', error);
      toast({
        title: 'Erro inesperado.',
        description: 'Ocorreu um erro inesperado ao atualizar a visibilidade.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleDateChange = async (news_id, newDateTime) => {
    try {
      const response = await fetch('/api/articlesPublish', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: news_id,
          is_visible: visibility[news_id],
          publicated_date: newDateTime,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        toast({
          title: 'Data e hora atualizadas.',
          description: 'A data e hora foram atualizadas com sucesso.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        getNews();
      } else {
        console.error('Erro ao atualizar data e hora:', response.status);
        toast({
          title: 'Erro ao atualizar.',
          description: 'Ocorreu um erro ao atualizar a data e hora.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Erro inesperado:', error);
      toast({
        title: 'Erro inesperado.',
        description: 'Ocorreu um erro inesperado ao atualizar a data e hora.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

 

  return (
    <>
      <Head>
        <title>Sala de Secacao</title>
        <meta name="description" content="Site do Sala de Secacao" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {session ? (
        <>
          <Sidebar />
          <LoggedUser />
          <div
            style={{
              marginLeft: '180px',
              marginRight: '50px',
              marginTop: '100px',
            }}
          >
            <ChakraProvider>
              <br />
              <Heading size="xl">Listagem de Artigos</Heading>
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
                  <Heading size="m">{news.article_title}</Heading>
                  <Text mt={2}>Por: {news.reporter_name}</Text>
                  <Text mt={2} mb={2}>
                    Data da Criação:{' '}
                    {moment(news.created_at).format('DD/MM/YYYY HH:mm:ss')}
                  </Text>
                  <Text mt={2} mb={2}>
                    Data da Publicação:{' '}
                    {moment(news.publicated_date).format('DD/MM/YYYY HH:mm:ss')}
                  </Text>
                  <Text mt={2} mb={2}>
                    Publicado:{' '}
                    <strong>
                      {' '}
                      {visibility[news.id] ? 'Publicado' : 'Não Publicado'}
                    </strong>
                  </Text>

                  <Flex mt={2} m={2} p={2} direction="column">
                    <br />
                    <FormControl>
                      <FormLabel htmlFor={`datetime-local-${news.id}`}>
                        Data e Hora de Publicação
                      </FormLabel>
                      <Input
                        id={`datetime-local-${news.id}`}
                        type="datetime-local"
                        value={dateTime[news.id] || ''}
                        onChange={(e) => handleChange(news.id, e)}
                        mb={2}
                        maxWidth={300}
                      />
                      <Button
                        m={2}
                        p={2}
                        colorScheme="blue"
                        onClick={() =>
                          handleDateChange(news.id, dateTime[news.id])
                        }
                      >
                        Atualizar Data e Hora
                      </Button>
                    </FormControl>
                    <Flex mt={2}>
                      <Button
                        m={2}
                        p={2}
                        colorScheme={visibility[news.id] ? 'red' : 'green'}
                        onClick={() =>
                          handleVisibilityChange(news.id, !visibility[news.id])
                        }
                      >
                        {visibility[news.id]
                          ? 'Retirar Publicação'
                          : 'Publicar'}
                      </Button>
                      <Button
                        m={2}
                        p={2}
                        colorScheme="red"
                        onClick={() => handleOpenDeleteModal(news.id)}
                      >
                        Excluir
                      </Button>
                    </Flex>
                  </Flex>
                </Box>
              ))}
            </ChakraProvider>

            <AlertDialog
              isOpen={isOpen}
              leastDestructiveRef={cancelRef}
              onClose={() => setIsOpen(false)}
            >
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    Confirmar Exclusão
                  </AlertDialogHeader>

                  <AlertDialogCloseButton />

                  <AlertDialogBody>
                    Tem certeza de que deseja excluir esta notícia? Esta ação
                    não pode ser desfeita.
                  </AlertDialogBody>

                  <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={() => setIsOpen(false)}>
                      Cancelar
                    </Button>
                    <Button
                      colorScheme="red"
                      onClick={handleDeleteNews}
                      ml={3}
                      isLoading={isDeleting}
                    >
                      Excluir
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
          </div>
        </>
      ) : (
        <Auth />
      )}
    </>
  );
};

export default App;
