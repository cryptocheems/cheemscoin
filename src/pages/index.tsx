import { Heading, Image, useColorMode } from "@chakra-ui/react";

import { Container } from "../components/Container";
import { Main } from "../components/Main";
import { CTA } from "../components/CTA";
import { NavBar } from "../components/NavBar";

// import { newContextComponents } from "@drizzle/react-components";
// TODO: Make these types
// @ts-ignore
import { drizzleReactHooks } from "@drizzle/react-plugin";
import { AddToMetamask } from "../components/AddToMetamask";

// const { useDrizzle, useDrizzleState } = drizzleReactHooks;
// const { ContractData, ContractForm } = newContextComponents;

const Index = () => {
  // const { drizzle } = useDrizzle();
  // const state = useDrizzleState((state: any) => state);

  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  return (
    <Container height="100vh">
      <NavBar />

      <Main alignItems="center" mt="10" height="100%">
        <Heading color={isDark ? "orange.300" : "orange.400"} size="4xl">
          Cheemscoin
        </Heading>
        <Image src="cheemscoin.png" maxBlockSize="20rem" />
        <AddToMetamask />
      </Main>
      <CTA />
    </Container>
  );
};

export default Index;
