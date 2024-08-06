import React, { useState, useEffect } from 'react';
import { Button, ChakraProvider, Center } from '@chakra-ui/react';
import { supabase } from '../utils/supabaseClientAdmin';

const LoggedUser = () => {
  const [session, setSession] = useState();
  const [isLoading, setIsLoading] = useState();

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
        setIsLoading(false);
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
      {session ? (
        <p>
          <Center>
            Usuário: {session.user.email} <br />
          </Center>
          <Center>
            <Button
              onClick={() => supabase.auth.signOut()}
              colorScheme="red"
              size="sm"
            >
              Sair
            </Button>
          </Center>
        </p>
      ) : null}
    </ChakraProvider>
  );
};

export default LoggedUser;
