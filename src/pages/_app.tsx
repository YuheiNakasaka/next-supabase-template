import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import Header from "../components/common/Header";
import { AuthProvider } from "../contexts/auth";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ChakraProvider>
        <Header />
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthProvider>
  );
}

export default MyApp;
