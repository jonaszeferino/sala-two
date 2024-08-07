import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Center,
  ChakraProvider,
  useToast,
  Text,
  Progress,
} from '@chakra-ui/react';

const getProgressColor = (value) => {
  if (value <= 20) return 'blue';
  if (value <= 60) return 'red';
  return 'yellow';
};

const CustomProgress = ({ value, color }) => {
  return (
    <Progress
      value={value}
      height="24px"
      borderRadius="md"
      colorScheme={color}
    />
  );
};

const ClubFans = () => {
  const [fanIdentity, setFanIdentity] = useState('');
  const [voted, setVoted] = useState(false);
  const [fanCounts, setFanCounts] = useState({
    total_gremio: '0',
    total_internacional: '0',
    total_other: '0',
    total_votos_unicos: '0',
    porcentagem_gremio: '0.00',
    porcentagem_internacional: '0.00',
    porcentagem_other: '0.00',
  });
  const toast = useToast();

  useEffect(() => {
    const fetchIP = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const ipData = await response.json();
        setFanIdentity(ipData.ip);
      } catch (error) {
        console.error('Error fetching IP:', error);
      }
    };

    fetchIP();
    // Fetch the initial fan counts when the component mounts
    fetchFanCounts();
  }, []);

  const fetchFanCounts = async () => {
    try {
      const response = await fetch('/api/clubFansCount', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        setFanCounts(result[0] || {}); // Use empty object as default if result[0] is undefined
      } else {
        console.error('Error fetching fan counts:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleFanCount = async (club) => {
    let data = {};

    switch (club) {
      case 'internacional':
        data = {
          internacional_count: 1,
          gremio_count: 0,
          other_count: 0,
          fan_identity: fanIdentity,
        };
        break;
      case 'gremio':
        data = {
          internacional_count: 0,
          gremio_count: 1,
          other_count: 0,
          fan_identity: fanIdentity,
        };
        break;
      case 'other':
        data = {
          internacional_count: 0,
          gremio_count: 0,
          other_count: 1,
          fan_identity: fanIdentity,
        };
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
        setVoted(true);
        const result = await response.json();
        console.log('Success:', result);
        toast({
          title: 'Sucesso',
          description: 'Voto Contabilizado',
          status:
            club === 'internacional'
              ? 'error'
              : club === 'other'
                ? 'warning'
                : 'info',
          duration: 5000,
          isClosable: true,
        });
        // Fetch the updated fan counts after the vote
        fetchFanCounts();
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
          <Button
            colorScheme="red"
            m={2}
            onClick={() => handleFanCount('internacional')}
            isDisabled={voted}
          >
            Internacional
          </Button>
          <Button
            colorScheme="blue"
            m={2}
            onClick={() => handleFanCount('gremio')}
            isDisabled={voted}
          >
            Grêmio
          </Button>
          <Button
            colorScheme="gray"
            m={2}
            onClick={() => handleFanCount('other')}
            isDisabled={voted}
          >
            Não gosto de nenhum
          </Button>

          <Box mt={4}>
            <Box mt={4}>
              <Text>Grêmio: {fanCounts.porcentagem_gremio}%</Text>
              <CustomProgress
                value={parseFloat(fanCounts.porcentagem_gremio)}
                color="blue"
              />
              <Text>
                Internacional: {fanCounts.porcentagem_internacional}
                %
              </Text>
              <CustomProgress
                value={parseFloat(fanCounts.porcentagem_internacional)}
                color="red"
              />
              <Text>Porcentagem Outros: {fanCounts.porcentagem_other}%</Text>
              <CustomProgress
                value={parseFloat(fanCounts.porcentagem_other)}
                color="yellow"
              />
            </Box>
          </Box>
        </Box>
      </Center>
    </ChakraProvider>
  );
};

export default ClubFans;
