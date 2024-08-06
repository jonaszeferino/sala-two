import { Flex, Link } from '@chakra-ui/react';
import { FaTwitter, FaYoutube, FaInstagram, FaTiktok } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

export const Social = () => {
  return (
    <Flex justify="center" gap="20px" p="20px">
      <Link href="https://twitter.com/Saladesecacao" isExternal>
        <FaTwitter size="50px" />
      </Link>
      <Link href="https://twitter.com/Saladesecacao" isExternal>
        <FaXTwitter size="50px" />
      </Link>
      <Link href="https://www.youtube.com/@SaladeSecacao" isExternal>
        <FaYoutube size="50px" />
      </Link>
      <Link href="https://www.instagram.com/saladesecacao/" isExternal>
        <FaInstagram size="50px" />
      </Link>
      <Link href="https://www.tiktok.com/@saladeseca?lang=pt-BR" isExternal>
        <FaTiktok size="50px" />
      </Link>
    </Flex>
  );
};
