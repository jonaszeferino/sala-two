import React, { useState } from "react";
import Link from "next/link";
import {
  Box,
  Flex,
  Text,
  ChakraProvider,
  Image,
  Center,
} from "@chakra-ui/react";

const Navbar = () => {
  return (
    <ChakraProvider>
      <Box
        bg="linear-gradient(to right, blue, red)"
        py={4}
        position="fixed"
        w="100%"
      >
        <Flex align="center" justify="center">
        <Text color="white" px={4}>
            Colunas
          </Text>
          <Text color="white" px={4}>
            Notícias
          </Text>
          <Box boxSize="100px">
            <Image src="/sala.png" alt="logo" borderRadius="full" />
          </Box>
          <Text color="white" px={4}>
            Vídeos
          </Text>
          <Text color="white" px={4}>
            Palpites
          </Text>
        </Flex>
      </Box>
    </ChakraProvider>
  );
};

export default Navbar;

///colocar links
