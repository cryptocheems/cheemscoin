import { ChakraProvider } from "@chakra-ui/react";
import "../styles.css";
import theme from "../theme";
import { AppProps } from "next/app";
import { Container } from "../components/Container";
import { NavBar } from "../components/NavBar";
import Head from "next/head";

// import { Drizzle, IDrizzleOptions } from "@drizzle/store";
// @ts-ignore
// import { drizzleReactHooks } from "@drizzle/react-plugin";
// import { IContract } from "@drizzle/store/types/IContract";

// import Cheemscoin from "../artifacts/Cheemscoin.json";

// const drizzleOptions: IDrizzleOptions = {
//   contracts: [(Cheemscoin as unknown) as IContract],
// };

// const drizzle = new Drizzle(drizzleOptions);
// const { DrizzleProvider } = drizzleReactHooks;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/cheemscoin/favicon.ico" />
        <title>Cheemscoin</title>
      </Head>
      <ChakraProvider resetCSS theme={theme}>
        <Container height="100vh">
          <NavBar />
          <Component {...pageProps} />
        </Container>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
