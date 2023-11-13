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
  const [content, setContent] = useState(""); // Para armazenar o conteúdo da notícia
  const [jornalist, setJornalist] = useState(""); // Para armazenar o conteúdo da notícia

  const handleEditorChange = (content, editor) => {
    setContent(content); // Atualiza o estado com o conteúdo do editor
  };

  const saveNews = () => {
    // Aqui você irá realizar a chamada para a API para salvar a notícia
    const data = {
      news: content,
      journalist_name: "Nome do jornalista", // Substitua com o nome do jornalista adequado
    };

    fetch("https://seusite.com/api/postNews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        // Tratar a resposta da requisição aqui (por exemplo, exibir uma mensagem de sucesso)
        console.log("Notícia salva com sucesso!", response);
      })
      .catch((error) => {
        // Lidar com possíveis erros na requisição
        console.error("Erro ao salvar notícia:", error);
      });
  };

  return (
    <>
      <Sidebar />

      <div
        style={{ marginLeft: "250px", marginRight: "50px", marginTop: "100px" }}
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
          initialValue="Welcome to TinyMCE!"
          onEditorChange={handleEditorChange} // Quando o conteúdo é alterado, atualiza o estado
        />
        <br />
        <ChakraProvider>
          <FormControl id="corinthiansScore">
            <FormLabel>Autor</FormLabel>
            <Input
              type="text"
              value={jornalist}
              onChange={handleEditorChange}
            />
          </FormControl>
          <br />
          <Button colorScheme="blue" onClick={saveNews}>
            Salvar Notícia
          </Button>
        </ChakraProvider>
      </div>
    </>
  );
};

export default App;
