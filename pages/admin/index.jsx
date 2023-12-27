import Head from 'next/head';
import { ChakraProvider, Center, Box } from '@chakra-ui/react';

import { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabaseClientAdmin';
import Auth from '../../components/Auth';
import LoggedUser from '../../components/LoggedUser';

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
    <ChakraProvider>
      <Head>
        <title>Sala de Secacao</title>
        <meta name="description" content="Site do Sala de Secacao" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box mt="100px">
        <Center>
          <LoggedUser />
        </Center>

        {session ? <Box>Links para as opções</Box> : <Auth />}
      </Box>
    </ChakraProvider>
  );
}
