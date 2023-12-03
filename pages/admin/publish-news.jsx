import React, { useEffect, useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import Sidebar from '../../components/Sidebar';
import {
  Box,
  Center,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  HStack,
  Button,
  Heading,
  Text,
  Switch,
  Input,
} from '@chakra-ui/react';
import moment from 'moment-timezone';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dataNews, setDataNews] = useState([]);
  const [selectedNews, setSelectedNews] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isSave, setIsSave] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const [publishedDataList, setPublishedDataList] = useState({});

  const getNews = async () => {
    try {
      const response = await fetch(`/api/getNews`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const dataRecive = await response.json();
        console.log('Dados do usuário:', dataRecive);
        setIsLoading(false);
        setDataNews(dataRecive);
      } else {
        if (response.status === 404) {
          setIsLoading(false);
        }
        console.error('Erro ao buscar o usuário:', response.status);
      }
    } catch (error) {
      console.error('Erro inesperado:', error);
    }
  };

  useEffect(() => {
    console.log('Chamou o useEffect');
    getNews();
    setIsLoading(true);
  }, []);

  const handleSelection = (newsId) => {
    if (selectedNews.includes(newsId)) {
      setSelectedNews(selectedNews.filter((id) => id !== newsId));
    } else {
      setSelectedNews([...selectedNews, newsId]);
    }
  };

  const handlePublishChange = (newsId, publishedState) => {
    setPublishedDataList((prevDataList) => ({
      ...prevDataList,
      [newsId]: {
        ...prevDataList[newsId],
        published: publishedState,
      },
    }));
  };

  const handlePublishDatetimeChange = (newsId, publishDatetime) => {
    setPublishedDataList((prevDataList) => ({
      ...prevDataList,
      [newsId]: {
        ...prevDataList[newsId],
        publish_datetime: publishDatetime,
      },
    }));
  };

  const savePublishNews = async () => {
    console.log('Chamou!');
    try {
      setIsSaving(true);
      setIsSave(false);
      setIsLoading(true);
      console.log('publishedDataList:', publishedDataList);
      const requests = selectedNews.map(async (newsId) => {
        const newsData = {
          published: publishedDataList[newsId].published,
          publish_datetime: publishedDataList[newsId].publish_datetime,
          news_id: newsId,
        };
        console.log('Chamando fetch para /api/postPublishNews');
        const response = await fetch('/api/postPublishNews', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newsData),
        });
        if (response.ok) {
          console.log('Notícia salva com sucesso!', response);
          setDataNews(dataNews.filter((news) => news.news_id !== newsId));
          setSelectedNews((prevSelected) =>
            prevSelected.filter((id) => id !== newsId),
          );
        } else {
          console.error('Erro ao salvar notícia:', response);
        }
      });

      await Promise.all(requests);
      setIsLoading(false);
      setIsSave(true);
      setIsSaving(false);
    } catch (error) {
      console.error('Erro ao salvar notícia:', error);
    }
  };

  return (
    <>
      <Sidebar />
      <div
        style={{ marginLeft: '180px', marginRight: '50px', marginTop: '100px' }}
      >
        {isLoading ? <Text>Carregando</Text> : null}
        <Center mt="50px">
          <Heading>Publicar Notícias / Crônicas Salvas</Heading>
        </Center>

        <Center>
          <Box mt="100px" mb="50px">
            {isLoading ? (
              <Text>Carregando...</Text>
            ) : (
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Título</Th>
                    <Th>News ID</Th>
                    <Th>Jornalista</Th>
                    <Th>Data de Criação</Th>
                    <Th>Publicar</Th>
                    <Th>Data e Hora de Publicação</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {dataNews.map((item, index) => (
                    <Tr key={index}>
                      <Td>
                        <HStack spacing={2}>
                          <Center>
                            <Heading bg="gray.250">{item.title}</Heading>
                          </Center>
                        </HStack>
                      </Td>
                      <Td>{item.news_id}</Td>
                      <Td>{item.jornalist_name}</Td>
                      <Td>
                        {moment(item.created_at)
                          .tz('America/Sao_Paulo')
                          .format('DD/MM/YYYY HH:mm:ss')}
                      </Td>
                      <Td>
                        <Switch
                          value={
                            publishedDataList[item.news_id]?.published || false
                          }
                          colorScheme="teal"
                          onChange={(e) => {
                            handlePublishChange(item.news_id, e.target.checked);
                          }}
                        />
                      </Td>
                      <Td>
                        <Input
                          type="datetime-local"
                          onChange={(e) => {
                            handlePublishDatetimeChange(
                              item.news_id,
                              e.target.value,
                            );
                          }}
                        />
                      </Td>
                      <Td>
                        <Button
                          colorScheme={
                            selectedNews.includes(item.news_id)
                              ? 'teal'
                              : 'blue'
                          }
                          onClick={() => {
                            handleSelection(item.news_id);
                          }}
                        >
                          {selectedNews.includes(item.news_id)
                            ? 'Selecionado'
                            : 'Selecionar'}
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            )}
            <br/>
            <Center>
              <Button colorScheme="blue" onClick={savePublishNews}>
                Salvar
              </Button>
            </Center>
            {isSaving === true ? <Text>Salvando</Text> : null}
            {isSave === true ? <Text>Salvo</Text> : null}
          </Box>
        </Center>
      </div>
    </>
  );
};

export default App;
