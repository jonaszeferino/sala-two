import '@/styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import { GoogleAnalytics } from '@next/third-parties/google'

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
      <GoogleAnalytics gaId="G-YB2QWRRN12" />
    </ChakraProvider>
  );
}