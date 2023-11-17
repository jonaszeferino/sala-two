import React, { useState } from "react";
import Link from "next/link";
import {
  Box,
  Flex,
  Text,
  ChakraProvider,
  Image,
  Grid,
} from "@chakra-ui/react";

const Sidebar = () => {
  return (
    <ChakraProvider>
      <Grid templateColumns="200px 1fr" gap={4}>
        <Box
          bg="black"
          py={4}
          position="fixed"
          h="100vh"
          left={0}
          top={0}
          zIndex={1}
        >
          <Flex direction="column" align="center" justify="center">
            <Box boxSize="100px" py={4}>
              <Image src="/sala.png" alt="logo" borderRadius="full" />
            </Box>
            <br/>
            <Link href="/admin/create-games">
              <Text color="white" py={2}>
                Criação de jogos
              </Text>
            </Link>
            <Link href="/admin/create-club">
              <Text color="white" py={2}>
                Criação de Times
              </Text>
            </Link>
            <Link href="/admin/create-news">
              <Text color="white" py={2}>
                Notícias
              </Text>
            </Link>
            <Link href="/colunas">
              <Text color="white" py={2}>
                Palpites
              </Text>
            </Link>
          </Flex>
        </Box>
        <Box pl="200px"> {/* Espaço para a barra lateral */}</Box>
      </Grid>
    </ChakraProvider>
  );
};

export default Sidebar;
