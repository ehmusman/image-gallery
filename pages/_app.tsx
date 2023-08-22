import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import Layout from '../components/Layout'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <><ChakraProvider>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    <ToastContainer />
  </ChakraProvider>
  </>
}

export default MyApp
