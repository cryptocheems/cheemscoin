import { ChakraProvider } from "@chakra-ui/react";

import theme from "../theme";
import { AppProps } from "next/app";
import Head from "next/head";

// import { Drizzle, IDrizzleOptions } from "@drizzle/store";
// @ts-ignore
import { drizzleReactHooks } from "@drizzle/react-plugin";
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
        <link rel="shortcut icon" href="/favicon.ico" />
        <title>Cheemscoin</title>
      </Head>
      {/* <DrizzleProvider drizzle={drizzle}> */}
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
      {/* </DrizzleProvider> */}
    </>
  );
}

export default MyApp;
