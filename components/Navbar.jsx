import {
  Box,
  Flex,
  Image,
  Link,
  useMediaQuery,
  IconButton,
  Stack,
  useDisclosure,
  HStack,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { HamburgerIcon, CloseIcon, ChevronRightIcon } from '@chakra-ui/icons';

export const Navbar = () => {
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg="linear-gradient(to right, blue, red)" py={4} w="100%">
      {isMobile ? (
        <Flex direction="column" align="center" gap="10px">
          <HStack>
            <IconButton
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label="Toggle Navigation"
              onClick={isOpen ? onClose : onOpen}
              variant="outline"
              color="white"
              size="lg"
            />
            
            <Link as={NextLink} href="/" color="white">
              <Box boxSize="100px">
                <Image src="/sala.png" alt="logo" borderRadius="full" />
              </Box>
            </Link>
            
          </HStack>

          {isOpen && (
            <Stack spacing={4} mt={4}>
              <Link color="white" as={NextLink} href="/noticias" onClick={onClose}>
                <span color="white">Notícias</span>
              </Link>
              <Link  color="white" as={NextLink} href="/artigos" onClick={onClose}>
                <span color="white">Colunas</span>
              </Link>
              <Link color="white" as={NextLink} href="/videos" onClick={onClose}>
                <span color="white">Vídeos</span>
              </Link>
            </Stack>
          )}
        </Flex>
      ) : (
        <Flex align="center" justify="center" gap="20px">
          <Link as={NextLink} href="/noticias" color="white">
            Notícias
          </Link>
          <Link as={NextLink} href="/artigos" color="white">
            Colunas
          </Link>
          <Link as={NextLink} href="/" color="white">
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
      )}
    </Box>
  );
};
