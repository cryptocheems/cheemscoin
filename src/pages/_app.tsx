import { ChakraProvider, useColorMode } from "@chakra-ui/react";
import "../styles.css";
import theme from "../theme";
import { AppProps } from "next/app";
import { Container } from "../components/Container";
import { NavBar } from "../components/navbar/NavBar";
import Head from "next/head";
import { Footer } from "../components/Footer";

function MyApp({ Component, pageProps }: AppProps) {
  const { colorMode } = useColorMode();
  const color = { light: "black", dark: "white" };

  return (
    <ChakraProvider resetCSS theme={theme}>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <title>Cheemscoin</title>
        <meta name="description" content="Making meme dreams into reality" />
      </Head>
      <Container height="100vh" color={color[colorMode]}>
        <NavBar />
        <Component {...pageProps} />
        <Footer />
      </Container>
    </ChakraProvider>
  );
}

export default MyApp;
