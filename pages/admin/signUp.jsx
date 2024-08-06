import React, { useState } from 'react';
import {
  Button,
  ChakraProvider,
  Center,
} from '@chakra-ui/react';
import { supabase } from '../../utils/supabaseClientAdmin';
import Auth from '../../components/Auth';
import Head from 'next/head';

export default function SignUp() {
  const [session, setSession] = useState(null);

  return (
    <>
      <Head>
        <title>Senha</title>
        <meta name="keywords" content="tvshow,watch,review"></meta>
        <meta name="description" content="filmes, series,"></meta>
      </Head>
      <ChakraProvider>
        <>
          <ChakraProvider>
            {session ? (
              <p>
                <Center>
                  User: {session.user.email} <br />
                  <Button
                    onClick={() => supabase.auth.signOut()}
                    colorScheme="red"
                    size="sm"
                  >
                    Close
                  </Button>
                </Center>
              </p>
            ) : null}
          </ChakraProvider>
        </>
        <Auth />
      </ChakraProvider>
    </>
  );
}
