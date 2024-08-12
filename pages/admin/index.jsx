import Head from 'next/head';
import {
  ChakraProvider,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  Center,
  HStack,
  Grid,
  Heading,
  Divider,
  Image,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import LoggedUser from '../../components/LoggedUser';
import { supabase } from '../../utils/supabaseClientAdmin';
import Auth from '../../components/Auth';
import Sidebar from '../../components/Sidebar';
import ClubFansAdmin from '../../components/ClubFansAdmin';

export default function Home() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function getInitialSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (mounted) {
        if (session) {
          setSession(session);
        }
      }
    }
    getInitialSession();
    const { subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      },
    );
    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  return (
    <>
      <ChakraProvider>
        <Head>
          <title>Sala de Secacao</title>
          <meta name="description" content="Site do Sala de Secacao" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        {session ? (
          <ChakraProvider>
            <Sidebar />
            <LoggedUser />

            <Center mt="100px">
              <Heading as="h1" size="2xl">
                Métricas{' '}
              </Heading>
            </Center>
            <br />
            <Center>
              <ClubFansAdmin />
            </Center>

            <Divider />
          </ChakraProvider>
        ) : (
          <Auth />
        )}
      </ChakraProvider>
    </>
  );
}
