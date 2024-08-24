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
//GA CODE: G-YB2QWRRN12 ele está no jonaszeferino@gmail.com

//se eu quiser colocar tags adicionais eu preciso colocar o código do google tag manager

{/* <GoogleAnalytics 
  gaId="G-YB2QWRRN12" 
  gtagConfig={{
    // Configurações adicionais aqui
  }}
/> */}



