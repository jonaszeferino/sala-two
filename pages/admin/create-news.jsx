import React, { useEffect, useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
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
  Card,
  Flex,
  Tag,
  TagLabel,
  TagCloseButton,
  VStack,
  Select,
  HStack,
} from '@chakra-ui/react';
import moment from 'moment-timezone';

const App = () => {
  const [content, setContent] = useState('');
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

  const handleEditorChange = (content) => {
    setContent(content);
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
    setContent('');
    setJournalist('');
    setTitle('');
    setIsLoading(false);
    setTagInput('');
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
      news: content,
      journalist_name: journalist,
      image_link: imageLink,
      title: title,
      tags: tags,
    };

    console.log('TesteData', data);
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

  // tags:

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
  // detelar as noticias salvas:
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

      <div
        style={{ marginLeft: '180px', marginRight: '50px', marginTop: '100px' }}
      >
        <Editor
          apiKey="ccpaulbj9jkbgr7ftwb35htdbzziawivodom2f71ce6eb7mz"
          init={{
            plugins:
              'ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss',
            toolbar:
              'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
            tinycomments_mode: 'embedded',
            tinycomments_author: 'Author name',
            mergetags_list: [
              { value: 'First.Name', title: 'First Name' },
              { value: 'Email', title: 'Email' },
            ],
            ai_request: (request, respondWith) =>
              respondWith.string(() =>
                Promise.reject('See docs to implement AI Assistant'),
              ),
          }}
          initialValue="Comece a editar sua notícia/crônica. Caso queira adicionar uma imagem, é necessário inserir o link da mesma. O Imgur é uma boa opção. Dica: pegue uma Imagem Livre ou faça a citação do autor
          Deixe a imagem com um width de 1200px, coloque em italico abaixo da imagem no final dela o autor ou fonte. Adicione as tags e escolha a cor vermelha pra tags relacionadas ao inter e azul para o grêmio, outras tags, coloque outras cores.
          Outra questão, deixe o margem final e inicial do texto conforme a foto, ou seja, o texto nao pode passar o tamanho da imagem
          Obs.: A notícia ou Crônica ficará no site com a formatação exata que estará aqui embaixo"
          onEditorChange={handleEditorChange}
        />
        <br />
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
          <br/>

          <VStack spacing={5}>
            <Flex p="5px" alignItems="center" justifyContent="flex-start">
              <Input
                value={tagInput}
                onChange={handleTagInputChange}
                placeholder="Digite uma tag"
              />
              <Select
                value={selectedColor}
                onChange={(e) => handleColorChange(e.target.value)}
              >
                {availableColors.map((color) => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ))}
              </Select>

              <Tag
                ml={5}
                p={2}
                colorScheme={selectedColor}
                variant="solid"
                size="lg"
                onClick={handleAddTag}
                style={{
                  height: '30px',
                  width: '200px',
                }}
              >
                Adicionar
              </Tag>
            </Flex>

            <Flex>
              {tags.map((tag, index) => (
                <Tag
                  key={index}
                  mr={2}
                  mb={2}
                  colorScheme={tag.color}
                  variant="solid"
                >
                  <TagLabel>{tag.label}</TagLabel>
                  <TagCloseButton onClick={() => handleRemoveTag(tag)} />
                </Tag>
              ))}
            </Flex>
          </VStack>

          <Button colorScheme="blue" onClick={saveNews} isDisabled={isSaving}>
            Salvar Notícia
          </Button>

          {isSave === true ? (
            <Button colorScheme="blue" onClick={Clean}>
              Nova Notícia{' '}
            </Button>
          ) : null}

          {isSaving == true ? 'Salvando' : null}
          {isSave == true ? 'Salvo' : null}
        </ChakraProvider>

        {isLoading ? <Text>Carregando</Text> : null}

        <Center mt="50px">
          <Heading>Notícias / Cronicas Salvas</Heading>
        </Center>

        <Center>
          <Box mt="100px" mb="50px">
            {isLoading ? (
              <Text>Carregando...</Text>
            ) : (
              dataNews.map((item, index) => (
                <Box key={index} bg="gray.250" p="10px">
                  <Center>
                    <Heading bg="gray.250">{item.title}</Heading>
                  </Center>
                  <Flex justifyContent="space-between" alignItems="center">
                    <Text ml="0px">{item.jornalist_name}</Text>
                    <Text mr="0px">
                      {moment(item.created_at)
                        .tz('America/Sao_Paulo')
                        .format('DD/MM/YYYY HH:mm:ss')}
                    </Text>
                  </Flex>
                  <br />
                  <Center>
                    <Box bg="gray.200" p={4}>
                      <Text dangerouslySetInnerHTML={{ __html: item.news }} />
                    </Box>
                  </Center>
                  <br />
                  <br />
                  <HStack spacing={2}>
                    {item.tags &&
                      item.tags.map((tag, tagIndex) => (
                        <Tag
                          key={tagIndex}
                          variant="solid"
                          colorScheme={tag.color.toLowerCase()}
                        >
                          {tag.label}
                        </Tag>
                      ))}
                  </HStack>
                  <Center>
                    <Box bg="gray.200" p={4}>
                      <Text>news_Id: {item.news_id}</Text>
                    </Box>
                  </Center>
                  <Button
                    colorScheme="red"
                    onClick={() => handleDeleteNews(item.news_id)}
                  >
                    Excluir
                  </Button>
                  <Text>{isDeleted === true ? 'Deletado' : null}</Text>
                  <Text>{isDeleting === true ? 'Deletando' : null}</Text>
                </Box>
              ))
            )}
          </Box>
        </Center>
      </div>
    </>
  );
};

export default App;
