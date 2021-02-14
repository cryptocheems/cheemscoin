import { Heading, Image, useColorMode, Text, Link } from "@chakra-ui/react";

import { Container } from "../components/Container";
import { Main } from "../components/Main";
import { CTA } from "../components/CTA";
import { NavBar } from "../components/NavBar";

// import { newContextComponents } from "@drizzle/react-components";
// TODO: Make these types
// @ts-ignore
import { drizzleReactHooks } from "@drizzle/react-plugin";
import { AddToMetamask } from "../components/AddToMetamask";
import { useState } from "react";

// const { useDrizzle, useDrizzleState } = drizzleReactHooks;
// const { ContractData, ContractForm } = newContextComponents;

const Index = () => {
  // const { drizzle } = useDrizzle();
  // const state = useDrizzleState((state: any) => state);

  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const [doSpin, setDoSpin] = useState(false);
  const [animationTime, setAnimationTime] = useState(1 / 0.9);

  return (
    <Container height="100vh">
      <NavBar />

      <Main alignItems="center" mt="10" height="100%">
        <Heading color={isDark ? "orange.300" : "orange.400"} size="4xl">
          Cheemscoin
        </Heading>
        <Image
          src="cheemscoin.png"
          maxBlockSize="20rem"
          animation={doSpin ? `spin ${animationTime}s ease-in-out` : undefined}
          onClick={() => {
            setDoSpin(true);
            setAnimationTime(a => a * 0.9);
          }}
          onAnimationEnd={() => setDoSpin(false)}
          cursor="pointer"
        />
        <AddToMetamask />
        <Text>
          Cheemscoin is an ERC20 token based on the{" "}
          <Link
            href="https://www.xdaichain.com/"
            color={isDark ? "orange.200" : "orange.500"}
            isExternal
           >
            xDai sidechain
          </Link>
          .
        </Text>
        <Text>
          More information{" "}
          <Link
            href="https://www.cryptocheems.com/"
            color={isDark ? "orange.200" : "orange.500"}
            isExternal
          >
            here
          </Link>
          .
        </Text>
      </Main>
      <CTA />
    </Container>
  );
};

export default Index;
