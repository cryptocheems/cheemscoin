import { ChakraProvider, useColorMode } from "@chakra-ui/react";
import "../styles.css";
import theme from "../theme";
import { AppProps } from "next/app";
import { Container } from "../components/Container";
import { NavBar } from "../components/navbar";
import Head from "next/head";
import { Footer } from "../components/Footer";
import { ChainId, Config, DAppProvider } from "@usedapp/core";

const config: Config = {
  readOnlyChainId: ChainId.xDai,
  readOnlyUrls: { [ChainId.xDai]: "https://rpc.xdaichain.com/" },
  supportedChains: [ChainId.xDai, ChainId.Rinkeby],
};

function MyApp({ Component, pageProps }: AppProps) {
  const { colorMode } = useColorMode();
  const color = { light: "black", dark: "white" };

  return (
    <ChakraProvider resetCSS theme={theme}>
      <DAppProvider config={config}>
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
      </DAppProvider>
    </ChakraProvider>
  );
}

export default MyApp;
