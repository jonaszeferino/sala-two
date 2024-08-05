import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { EditorState } from 'draft-js';
import 'quill/dist/quill.snow.css';
import Sidebar from '../../components/Sidebar';
import {
  ChakraProvider,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Heading,
  Box,
  Flex,
  Tag,
  TagLabel,
  TagCloseButton,
  Select,
  useToast,
  Center
} from '@chakra-ui/react';
import moment from 'moment-timezone';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const App = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [journalist, setJournalist] = useState('');
  const [imageLink, setImageLink] = useState('');
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [dataNews, setDataNews] = useState([]);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [selectedColor, setSelectedColor] = useState('blue');
  const [isSaving, setIsSaving] = useState(false);
  const [isSave, setIsSave] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [editorHtml, setEditorHtml] = useState('');
  
  const toast = useToast();

  const handleEditorChange = (html) => {
    setEditorHtml(html);
  };

  const handleJournalistChange = (event) => {
    setJournalist(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleImageLinkChange = (event) => {
    setImageLink(event.target.value);
  };

  const Clean = () => {
    setEditorState(EditorState.createEmpty());
    setJournalist('');
    setTitle('');
    setImageLink('');
    setTagInput('');
    setTags([]);
    setSelectedColor('blue');
    setIsSaving(false);
    setIsSave(false);
    setIsDeleting(false);
    setIsDeleted(false);
  };

  const saveNews = () => {
    setIsSaving(true);
    setIsSave(false);
    setIsLoading(true);

    const data = {
      article_title: title,
      reporter_name: journalist,
      image_link: imageLink,
      article_main: editorHtml,
      article_tags: tags.map((tag) => tag.label).join(', '),
      is_visible: false,
      publicated_date: moment().format('YYYY-MM-DD'),
    };

    fetch('/api/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(json => {
      console.log('Success:', json);
      setIsLoading(false);
      setIsSave(true);
      setIsSaving(false);
      toast({
        title: 'Notícia salva.',
        description: 'A notícia foi salva com sucesso.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    })
    .catch(error => {
      console.error('Error:', error);
      setIsLoading(false);
      setIsSaving(false);
      toast({
        title: 'Erro ao salvar.',
        description: 'Ocorreu um erro ao salvar a notícia.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    });
  };

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
        console.log('Dados recebidos:', dataRecive);
        setIsLoading(false);
        setDataNews(dataRecive);
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

  const availableColors = [
    'whiteAlpha',
    'blackAlpha',
    'gray',
    'red',
    'orange',
    'yellow',
    'green',
    'teal',
    'blue',
    'cyan',
    'purple',
    'pink',
    'linkedin',
    'facebook',
    'messenger',
    'whatsapp',
    'twitter',
    'telegram',
  ];

  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleAddTag = () => {
    if (tagInput.trim() !== '' && !tags.some((tag) => tag.label === tagInput)) {
      setTags([...tags, { label: tagInput, color: selectedColor }]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    const updatedTags = tags.filter((tag) => tag.label !== tagToRemove.label);
    setTags(updatedTags);
  };

  const handleDeleteNews = async (news_id) => {
    setIsDeleted(false);
    setIsDeleting(true);
    try {
      const response = await fetch('/api/articles', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ news_id: news_id }),
      });

      if (response.ok) {
        setIsDeleted(true);
        getNews();
        toast({
          title: 'Notícia excluída.',
          description: 'A notícia foi excluída com sucesso.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        console.log('Notícia excluída com sucesso!');
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

  return (
    <>
      <Sidebar />

      <div
        style={{ marginLeft: '180px', marginRight: '50px', marginTop: '100px' }}
      >
        <ChakraProvider>
          <FormControl>
            <FormLabel>Título Para A Home</FormLabel>
            <Input type="text" value={title} onChange={handleTitleChange} />
          </FormControl>
          <br />
          <FormControl>
            <FormLabel>Link da Imagem</FormLabel>
            <Input
              type="text"
              value={imageLink}
              onChange={handleImageLinkChange}
            />
          </FormControl>
          <br />
          <FormControl>
            <FormLabel>Autor</FormLabel>
            <Input
              type="text"
              value={journalist}
              onChange={handleJournalistChange}
            />
          </FormControl>
          <br />
          <FormControl>
            <FormLabel>Conteúdo da Notícia</FormLabel>
            <Box
              border="1px"
              borderColor="gray.200"
              padding="4"
              borderRadius="md"
            >
              <ReactQuill theme="snow" value={editorHtml} onChange={handleEditorChange} />
            </Box>
          </FormControl>

          <br />
          <FormControl>
            <FormLabel>Tags</FormLabel>
            <Box display="flex" flexWrap="wrap" gap={2}>
              {tags.map((tag) => (
                <Tag
                  key={tag.label}
                  colorScheme={tag.color}
                  borderRadius="full"
                >
                  <TagLabel>{tag.label}</TagLabel>
                  <TagCloseButton onClick={() => handleRemoveTag(tag)} />
                </Tag>
              ))}
            </Box>
            <Box display="flex" mt={2} alignItems="center">
              <Input
                placeholder="Nova tag"
                value={tagInput}
                onChange={handleTagInputChange}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
              />
              <Select
                value={selectedColor}
                onChange={(e) => handleColorChange(e.target.value)}
                ml={2}
                width="150px"
              >
                {availableColors.map((color) => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ))}
              </Select>
              <Button onClick={handleAddTag} ml={2}>
                Adicionar Tag
              </Button>
            </Box>
          </FormControl>

          <Flex mt={4} justify="center">
            <Button
              colorScheme="blue"
              onClick={saveNews}
              isLoading={isSaving}
              loadingText="Salvando..."
              mr={2}
            >
              Salvar Notícia
            </Button>
            <Button
              colorScheme="red"
              onClick={() => Clean()}
              isLoading={isLoading}
              loadingText="Limpando..."
            >
              Limpar
            </Button>
          </Flex>

          {isSave && <Text mt={4} color="green.500">Notícia salva com sucesso!</Text>}
          {isDeleted && <Text mt={4} color="red.500">Notícia excluída com sucesso!</Text>}
          {isLoading && <Text mt={4}>Carregando...</Text>}

          <Heading mt={8} as="h3" size="lg">Notícias Cadastradas</Heading>
          <br/>
          {dataNews.map((news) => (
            <Box
              key={news.id}
              p={4}
              borderWidth="1px"
              borderRadius="md"
              mb={4}
              shadow="sm"
            >
              <Center>
                
              <Heading size="xl">{news.article_title}</Heading>
              </Center>
              <br/>
              <Text mt={2}>Por: {news.reporter_name}</Text>
              <Text mt={2} mb={2}>Data: {moment(news.publicated_date).format('DD/MM/YYYY')}</Text>
       
              <Center>
                <br/>
              
              <Box
                as="img"
                src={news.image_link}
                alt={news.article_title}
                borderRadius="md"
                //boxSize="1200px"
                width={"1200px"}
                objectFit="cover"
                mb={2}
              />
              </Center>
              <Text mt={2} dangerouslySetInnerHTML={{ __html: news.article_main }} />
              
              <Flex mt={2} justify="space-between">
                <Button
                  colorScheme="blue"
                  onClick={() => handleDeleteNews(news.id)}
                  isLoading={isDeleting}
                  loadingText="Excluindo..."
                >
                  Excluir
                </Button>
              </Flex>
            </Box>
          ))}
        </ChakraProvider>
      </div>
    </>
  );
};

export default App;
