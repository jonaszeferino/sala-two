import React, { useEffect, useState } from 'react';
import {
  EditorState,
  convertToRaw,
  RichUtils,
} from 'draft-js';
import Editor from '@draft-js-plugins/editor';
import createToolbarPlugin, { Separator } from '@draft-js-plugins/static-toolbar';
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
} from '@draft-js-plugins/buttons';
import '@draft-js-plugins/static-toolbar/lib/plugin.css';
import 'draft-js/dist/Draft.css';
import Sidebar from '../../components/Sidebar';
import {
  ChakraProvider,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Center,
  Heading,
  Box,
  Flex,
  Tag,
  TagLabel,
  TagCloseButton,
  VStack,
  Select,
} from '@chakra-ui/react';
import moment from 'moment-timezone';

// Criando o plugin da barra de ferramentas
const toolbarPlugin = createToolbarPlugin();
const { Toolbar } = toolbarPlugin;

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

  // Função de atualização do editor
  const handleEditorChange = (state) => {
    setEditorState(state);
  };

  // Função de comando de tecla
  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  // Funções de manipulação de dados
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
    const content = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
    const data = {
      news: content,
      journalist_name: journalist,
      image_link: imageLink,
      title: title,
      tags: tags,
    };

    console.log('Dados a serem enviados:', JSON.stringify(data));

    fetch('/api/postNews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        console.log('Notícia salva com sucesso!', response);
        setIsLoading(false);
        setIsSave(true);
        setIsSaving(false);
      })
      .catch((error) => {
        console.error('Erro ao salvar notícia:', error);
        setIsLoading(false);
        setIsSaving(false);
      });
  };

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
    if (tagInput.trim() !== '' && !tags.includes(tagInput)) {
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
    console.log('Chamou a Deleção');
    try {
      const response = await fetch('/api/deleteNews', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ news_id: news_id }),
      });

      if (response.ok) {
        setIsDeleted(false);
        getNews();
        console.log('Notícia excluída com sucesso!');
      } else {
        console.error('Erro ao excluir notícia:', response.status);
      }
    } catch (error) {
      console.error('Erro inesperado:', error);
    }
  };

  return (
    <>
      <Sidebar />

      <div style={{ marginLeft: '180px', marginRight: '50px', marginTop: '100px' }}>
        <ChakraProvider>
          <FormControl>
            <FormLabel>Título Para A Home</FormLabel>
            <Input type="text" value={title} onChange={handleTitleChange} />
          </FormControl>
          <br />
          <FormControl>
            <FormLabel>Link da Imagem</FormLabel>
            <Input type="text" value={imageLink} onChange={handleImageLinkChange} />
          </FormControl>
          <br />
          <FormControl>
            <FormLabel>Autor</FormLabel>
            <Input type="text" value={journalist} onChange={handleJournalistChange} />
          </FormControl>
          <br />
          <FormControl>
            <FormLabel>Conteúdo da Notícia</FormLabel>
            <Box border="1px" borderColor="gray.200" padding="4" borderRadius="md">
              <Toolbar>
                {(externalProps) => (
                  <>
                    <BoldButton {...externalProps} />
                    <ItalicButton {...externalProps} />
                    <UnderlineButton {...externalProps} />
                    <Separator {...externalProps} />
                    <HeadlineOneButton {...externalProps} />
                    <HeadlineTwoButton {...externalProps} />
                    <HeadlineThreeButton {...externalProps} />
                  </>
                )}
              </Toolbar>

              <Editor
                editorState={editorState}
                onChange={handleEditorChange}
                handleKeyCommand={handleKeyCommand}
                plugins={[toolbarPlugin]} // Ajuste aqui
              />
            </Box>
          </FormControl>
          <br />
          <VStack spacing={5}>
            <Flex p="5px" alignItems="center">
              <FormControl>
                <FormLabel>Tags</FormLabel>
                <Input
                  type="text"
                  value={tagInput}
                  onChange={handleTagInputChange}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                />
              </FormControl>
              <Select
                placeholder="Select color"
                value={selectedColor}
                onChange={(e) => handleColorChange(e.target.value)}
                width="150px"
                ml="2"
              >
                {availableColors.map((color) => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ))}
              </Select>
              <Button
                colorScheme="teal"
                ml="2"
                onClick={handleAddTag}
              >
                Adicionar Tag
              </Button>
            </Flex>
            {tags.map((tag) => (
              <Tag key={tag.label} colorScheme={tag.color}>
                <TagLabel>{tag.label}</TagLabel>
                <TagCloseButton onClick={() => handleRemoveTag(tag)} />
              </Tag>
            ))}
          </VStack>
          <br />
          <Button
            colorScheme="blue"
            onClick={saveNews}
            isLoading={isSaving}
            loadingText="Salvando"
          >
            Salvar
          </Button>
          <Button
            colorScheme="red"
            ml="2"
            onClick={() => Clean()}
          >
            Limpar
          </Button>
          {isSave && <Text color="green.500">Notícia salva com sucesso!</Text>}
          {isLoading && <Text color="blue.500">Carregando...</Text>}
          {isDeleting && <Text color="red.500">Deletando...</Text>}
          {isDeleted && <Text color="red.500">Notícia excluída com sucesso!</Text>}
        </ChakraProvider>
      </div>
    </>
  );
};

export default App;
