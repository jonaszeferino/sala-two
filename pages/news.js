import Head from "next/head";
import {
  ChakraProvider,
  Box,
  Text,
  Center,
  Heading,
  Card,
  CardFooter,
  Stack,
  CardBody,
  Button,
  Image,
  Link,
} from "@chakra-ui/react";
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

        {/* Meta tags para Open Graph (Facebook) */}
        <meta property="og:title" content="Sala de Secacao" />
        <meta property="og:description" content="Site do Sala de Secacao" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="URL_DA_IMAGEM_PARA_COMPARTILHAMENTO"
        />
        <meta property="og:url" content="URL_DA_PAGINA" />

        {/* Meta tags para Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Sala de Secacao" />
        <meta name="twitter:description" content="Site do Sala de Secacao" />
        <meta name="twitter:image" content="URL_DA_IMAGEM_PARA_TWITTER" />
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
        <Card
          direction={{ base: "column", sm: "row" }}
          overflow="hidden"
          variant="outline"
        >
          <Image
            objectFit="cover"
            maxW={{ base: "100%", sm: "200px" }}
            src="http://diariogaucho.rbsdirect.com.br/imagesrc/45391726.jpg?w=600"
            alt="Imagem da Noticia"
          />

          <Stack>
            <CardBody>
              <Heading size="md">
                Luciano Périco: alerta ligado no Inter
              </Heading>
              <Text py="2">Colorado está próximo do Z-4 do Brasileirão</Text>
              <Text>Fonte: Clicrbs.com.br</Text>
              <Text>20/20/2023 09:00:20</Text>
            </CardBody>

            <CardFooter>
              <Button variant="solid" colorScheme="red">
                <Link
                  href="http://diariogaucho.clicrbs.com.br/rs/esporte/noticia/2023/10/luciano-perico-alerta-ligado-no-inter-34365732.html"
                  target="_blank"
                >
                  Veja a notícia
                </Link>
              </Button>
            </CardFooter>
          </Stack>
        </Card>
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

      <div>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5165191224568168"
          crossorigin="anonymous"
        ></script>
      </div>
    </ChakraProvider>
  );
}
