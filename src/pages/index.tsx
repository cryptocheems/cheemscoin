import { Heading, Image, Text, Link, useColorModeValue } from "@chakra-ui/react";
import { Main } from "../components/Main";
import { CTA } from "../components/CTA";
import { AddToMetamask } from "../components/AddToMetamask";
import { useState } from "react";

const Index = () => {
  const [doSpin, setDoSpin] = useState(false);
  const [animationTime, setAnimationTime] = useState(1 / 0.9);

  return (
    <>
      <Main alignItems="center" mt="10" height="100%">
        <Heading color={useColorModeValue("orange.400", "orange.300")} size="4xl">
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
          More information{" "}
          <Link
            href="https://www.cryptocheems.com/"
            color={useColorModeValue("orange.500", "orange.200")}
            isExternal
          >
            here
          </Link>
        </Text>
      </Main>
      <CTA />
    </>
  );
};

export default Index;
