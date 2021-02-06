import { ChakraProvider } from "@chakra-ui/react";

import theme from "../theme";
import { AppProps } from "next/app";

import { Drizzle, IDrizzleOptions } from "@drizzle/store";
// @ts-ignore
import { drizzleReactHooks } from "@drizzle/react-plugin";
import { IContract } from "@drizzle/store/types/IContract";
import { LoadingContainer } from "../components/LoadingContainer";

import Greeter from "../artifacts/Greeter.json";

const drizzleOptions: IDrizzleOptions = {
  contracts: [(Greeter as unknown) as IContract],
};

const drizzle = new Drizzle(drizzleOptions);
const { DrizzleProvider } = drizzleReactHooks;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DrizzleProvider drizzle={drizzle}>
      <ChakraProvider resetCSS theme={theme}>
        <LoadingContainer>
          <Component {...pageProps} />
        </LoadingContainer>
      </ChakraProvider>
    </DrizzleProvider>
  );
}

export default MyApp;
