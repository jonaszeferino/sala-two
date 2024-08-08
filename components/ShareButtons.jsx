import React from 'react';
import { IconButton, HStack, Button, Icon } from '@chakra-ui/react';
import { FaWhatsapp, FaFacebook } from 'react-icons/fa';

const ShareButtons = ({ id, title }) => {
  const baseUrl = 'https://saladesecacao.com.br/pagina-do-artigo?id=';
  const fullUrl = `${baseUrl}${id}`;

  const encodedUrl = encodeURIComponent(fullUrl);
  const encodedTitle = encodeURIComponent(title);

  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;

  return (
    <HStack spacing={4}>
      <Button
        as="a"
        href={whatsappShareUrl}
        target="_blank"
        aria-label="Compartilhar no WhatsApp"
        leftIcon={<Icon as={FaWhatsapp} boxSize={6} />} 
        colorScheme="whatsapp"
        variant="solid"
      >
        Compartilhar
      </Button>
      <Button
        as="a"
        href={facebookShareUrl}
        target="_blank"
        aria-label="Compartilhar no Facebook"
        leftIcon={<Icon as={FaFacebook} boxSize={6} />} 
        colorScheme="facebook"
        variant="solid"
      >
        Compartilhar
      </Button>
    </HStack>
  );
};

export default ShareButtons;
