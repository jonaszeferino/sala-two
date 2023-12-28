import { Box, Flex, Image, Link } from '@chakra-ui/react';
import NextLink from 'next/link';

export const Navbar = () => {
  return (
    <Box bg="linear-gradient(to right, blue, red)" py={4} w="100%">
      <Flex align="center" justify="center" gap="20px">
        <Link as={NextLink} href="/news" color="white">
          Notícias
        </Link>
        <Link as={NextLink} href="/news" color="white">
          Colunas
        </Link>
        <Link as={NextLink} href="/columns" color="white">
          <Box boxSize="100px">
            <Image src="/sala.png" alt="logo" borderRadius="full" />
          </Box>
        </Link>
        <Link as={NextLink} href="/videos" color="white">
          Vídeos
        </Link>
        <Link as={NextLink} href="/tips" color="white">
          Palpites
        </Link>
        
      </Flex>
    </Box>
  );
};
