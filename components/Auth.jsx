import React, { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClientAdmin";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  ChakraProvider,
  Center,
  Alert,
  AlertIcon,
  Link,
  Divider,
  InputGroup,
  InputRightElement,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaGoogle, FaEyeSlash, FaEye } from "react-icons/fa";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignUp = async () => {
    setAlertMessage("");
    try {
      const { user, error, status } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      setAlertMessage("Verifique seu E-mail");
      if (user) {
        console.log("Usuário cadastrado com sucesso:", user);
      } else if (error) {
        if (status === 429) {
          setAlertMessage("Você fez muitas solicitações recentemente. Aguarde um momento.");
        } else {
          setAlertMessage(error.message);
        }
      }
    } catch (e) {
      setAlertMessage(e.message);
    }
  };

  const handleSignIn = async () => {
    setAlertMessage("");
    try {
      const { user, session, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) {
        throw error;
      }
      setAlertMessage("Usuário Logando");
    } catch (e) {
      setAlertMessage(e.message);
    }
  };

  const changeForm = () => {
    setIsSignUp((value) => !value);
  };

  const handleGoogleSignIn = async () => {
    setAlertMessage("");
    try {
      const { user, session, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });
      if (error) {
        throw error;
      }
      setAlertMessage("Usuário Logando");
    } catch (e) {
      setAlertMessage(e.message);
    }
  };

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
      }
    );
    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  return (
    <ChakraProvider>
      <Center height="100vh" bg={useColorModeValue("gray.50", "gray.800")}>
        <Box
          p={6}
          borderWidth="1px"
          borderRadius="lg"
          maxW="400px"
          width="100%"
          bg="purple.100"
          boxShadow="lg"
        >
          <Heading as="h1" size="lg" textAlign="center" mb={4} color="purple.700">Sala de Secação ADMIN</Heading>
          <FormControl mb={4}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              bg="white"
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Senha</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                bg="white"
              />
              <InputRightElement width="3rem">
                <Button
                  h="1.5rem"
                  size="sm"
                  onClick={togglePasswordVisibility}
                  tabIndex="-1"
                  color="purple.500"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Link
            display="block"
            textAlign="center"
            color="purple.600"
            href="/send-email-password-reset"
            mb={4}
          >
            Esqueci minha senha
          </Link>
          <Stack spacing={4} mb={4}>
            {!isSignUp && (
              <Button
                colorScheme="purple"
                onClick={handleSignIn}
              >
                Login
              </Button>
            )}
            {isSignUp && (
              <Button
                colorScheme="purple"
                onClick={handleSignUp}
              >
                Criar Conta
              </Button>
            )}
          </Stack>
          {alertMessage && (
            <Alert status="info" mb={4}>
              <AlertIcon />
              {alertMessage}
            </Alert>
          )}
        </Box>
      </Center>
    </ChakraProvider>
  );
}
