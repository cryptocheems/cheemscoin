import { Box, useColorMode } from "@chakra-ui/react";

import { Hero } from "../components/Hero";
import { Container } from "../components/Container";
import { Main } from "../components/Main";
import { CTA } from "../components/CTA";
import { NavBar } from "../components/NavBar";

import { newContextComponents } from "@drizzle/react-components";
// TODO: Make these types
// @ts-ignore
import { drizzleReactHooks } from "@drizzle/react-plugin";

const { useDrizzle, useDrizzleState } = drizzleReactHooks;
const { ContractData, ContractForm } = newContextComponents;

const Index = () => {
  const { drizzle } = useDrizzle();
  const state = useDrizzleState((state: any) => state);

  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  return (
    <Container height="100vh">
      <NavBar />
      <Hero
        title={
          <ContractData contract="Greeter" method="get" drizzle={drizzle} drizzleState={state} />
        }
      />
      <Main>
        <Box
          p="2rem"
          borderWidth="2px"
          borderRadius="xl"
          borderColor={isDark ? "green.200" : "green.500"}
        >
          <ContractForm
            contract="Greeter"
            method="set"
            labels={["Greeting"]}
            drizzle={drizzle}
            drizzleState={state}
          />
        </Box>
      </Main>
      <CTA />
    </Container>
  );
};

export default Index;
