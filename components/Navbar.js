import {
  Box,
  Flex,
  Text,
  ChakraProvider,
  Image,
  Center,
  Link,
} from '@chakra-ui/react';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  return (
    <ChakraProvider>
      <Box
        bg="linear-gradient(to right, blue, red)"
        py={4}
        position="fixed"
        w="100%"
        className={styles.fixedNavbar}
        zIndex="1000"
      >
        <Flex align="center" justify="center">
          <Link href="/">
            <Text color="white" px={4}>
              Colunas
            </Text>
          </Link>
          <Link href="/news">
            <Text color="white" px={4}>
              Notícias
            </Text>
          </Link>
          <Link href="/">
            <Box boxSize="100px">
              <Image src="/sala.png" alt="logo" borderRadius="full" />
            </Box>
          </Link>
          <Link href="/videos">
            <Text color="white" px={4}>
              Vídeos
            </Text>
          </Link>
          <Link href="/tips">
            <Text color="white" px={4}>
              Palpites
            </Text>
          </Link>
        </Flex>
      </Box>
    </ChakraProvider>
  );
};

export default Navbar;
