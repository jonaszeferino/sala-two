import React, { useState, useEffect } from 'react';
import { Box, Button, Center, ChakraProvider, useToast } from '@chakra-ui/react';

const ClubFans = () => {
  const [fanIdentity, setFanIdentity] = useState('');
  const toast = useToast();
  const [voted, setVoted] = useState(false)

  const handleFanCount = async (club) => {
    let data = {};

    switch (club) {
      case 'internacional':
        data = { internacional_count: 1, gremio_count: 0, other_count: 0, fan_identity: fanIdentity };
        break;
      case 'gremio':
        data = { internacional_count: 0, gremio_count: 1, other_count: 0, fan_identity: fanIdentity };
        break;
      case 'other':
        data = { internacional_count: 0, gremio_count: 0, other_count: 1, fan_identity: fanIdentity };
        break;
      default:
        return;
    }

    try {
      const response = await fetch('/api/clubFans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setVoted(true)
        const result = await response.json();
        console.log('Success:', result);
        toast({
          title: 'Sucesso',
          description: 'Voto Contabilizado',
          status: club === 'internacional' ? 'error' : club === 'other' ? 'warning' : 'info',
          duration: 5000,
          isClosable: true,
        });
      } else {
        console.error('Error:', response.statusText);
        toast({
          title: 'Error',
          description: 'There was an error updating the fan count',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Error',
        description: 'There was an error updating the fan count',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <ChakraProvider>
      <Center>
        <Box>
          <Button colorScheme="red" m={2} onClick={() => handleFanCount('internacional')} isDisabled={voted}>
            Internacional
          </Button>
          <Button colorScheme="blue" m={2} onClick={() => handleFanCount('gremio')} isDisabled={voted}>
            Grêmio
          </Button>
          <Button colorScheme="gray" m={2} onClick={() => handleFanCount('other')} isDisabled={voted}>
            Não gosto de nenhum
          </Button>
        </Box>
      </Center>
    </ChakraProvider>
  );
};

export default ClubFans;
