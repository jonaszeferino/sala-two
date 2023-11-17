import { Box, Flex, Text, Image } from "@chakra-ui/react";

export const Navbar = () => {
  return (
    <Box bg="linear-gradient(to right, blue, red)" py={4} w="100%">
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
  );
};
