import Head from "next/head";
import { ChakraProvider, Box, Text, Center, Heading } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import { FaTwitter, FaYoutube, FaInstagram, FaTiktok } from "react-icons/fa";


export default function Home() {
  return (
    <ChakraProvider>
      <Head>
        <title>Sala de Secacao</title>
        <meta name="description" content="Site do Sala de Secacao" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <Center>
        <Heading>Site em construção</Heading>
      </Center>
      <Center>
        <Text>Acesse nosso conteúdo abaixo</Text>
      </Center>

      <Box pt="72px" p="20px">
        {" "}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <a
            href="https://twitter.com/Saladesecacao"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: "50px", padding: "20px" }}
          >
            <FaTwitter />
          </a>

          <a
            href="https://www.youtube.com/@SaladeSecacao"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: "50px", padding: "20px" }}
          >
            <FaYoutube />
          </a>
          <a
            href="https://www.instagram.com/saladesecacao/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: "50px", padding: "20px" }}
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.tiktok.com/@saladeseca?lang=pt-BR"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: "50px", padding: "20px" }}
          >
            <FaTiktok />
          </a>
        </div>
      </Box>
    </ChakraProvider>
  );
}
//test
