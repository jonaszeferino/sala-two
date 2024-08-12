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

const ClubFansAdmin = () => {
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
        setFanCounts(result[0] || {});
      } else {
        console.error('Error fetching fan counts:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <ChakraProvider>
      <Center>
        <Box>
          <Box mt={4}>
            <Box mt={4}>
              <Text>Grêmio: {fanCounts.porcentagem_gremio}%</Text>
              <CustomProgress
                value={parseFloat(fanCounts.porcentagem_gremio)}
                color="blue"
              />
              <Text>Internacional: {fanCounts.porcentagem_internacional}%</Text>
              <CustomProgress
                value={parseFloat(fanCounts.porcentagem_internacional)}
                color="red"
              />
              <Text>Porcentagem Outros: {fanCounts.porcentagem_other}%</Text>
              <CustomProgress
                value={parseFloat(fanCounts.porcentagem_other)}
                color="yellow"
              />

              <Text>Total de Votos únicos: {fanCounts.total_votos_unicos}</Text>
              <Text>Total de Votos Outros: {fanCounts.total_other}</Text>
              <Text>Total de Votos Internacional: {fanCounts.total_internacional}</Text>
              <Text>Total de Votos Grêmio: {fanCounts.total_gremio}</Text>
              
            </Box>
          </Box>
        </Box>
      </Center>
    </ChakraProvider>
  );
};

export default ClubFansAdmin;
