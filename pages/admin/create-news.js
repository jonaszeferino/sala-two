import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import Sidebar from "../../components/Sidebar";
import {
  ChakraProvider,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  Center,
  HStack,
  Switch,
  Stack,
  Heading,
} from "@chakra-ui/react";

const App = () => {
  const [content, setContent] = useState("");
  const [journalist, setJournalist] = useState("");
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState("");

  const handleEditorChange = (content, editor) => {
    setContent(content);
  };

  const handleJournalistChange = (event) => {
    setJournalist(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const saveNews = () => {
    setIsLoading(true);
    const data = {
      news: content,
      journalist_name: journalist,
      title: title,
    };

    fetch("/api/postNews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        console.log("Notícia salva com sucesso!", response);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao salvar notícia:", error);
        setIsLoading(false);
      });
  };

  return (
    <>
      <Sidebar />

      <div
        style={{ marginLeft: "180px", marginRight: "50px", marginTop: "100px" }}
      >
        <Editor
          apiKey="ccpaulbj9jkbgr7ftwb35htdbzziawivodom2f71ce6eb7mz"
          init={{
            plugins:
              "ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss",
            toolbar:
              "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
            tinycomments_mode: "embedded",
            tinycomments_author: "Author name",
            mergetags_list: [
              { value: "First.Name", title: "First Name" },
              { value: "Email", title: "Email" },
            ],
            ai_request: (request, respondWith) =>
              respondWith.string(() =>
                Promise.reject("See docs to implement AI Assistant")
              ),
          }}
          initialValue="Comece a editar sua notícia, caso queira adicionar uma imagem, é preciso coloar o link da mesmo, imgur é uma boa dica "
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
            <FormLabel>Autor</FormLabel>
            <Input
              type="text"
              value={journalist}
              onChange={handleJournalistChange}
            />
          </FormControl>
          <br />
          <Button colorScheme="blue" onClick={saveNews}>
            Salvar Notícia
          </Button>
        </ChakraProvider>
        {isLoading ? <Text>Carregando</Text> : null}
      </div>
    </>
  );
};

export default App;
