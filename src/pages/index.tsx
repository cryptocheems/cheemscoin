import {
  Heading,
  Image,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  useBoolean,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";
import { CTA } from "../components/CTA";
import { AddToMetamask } from "../components/AddToMetamask";
import { useState } from "react";

const Index = () => {
  const [doSpin, setDoSpin] = useState(false);
  const [animationTime, setAnimationTime] = useState(1 / 0.9);
  const [spinCount, setSpinCount] = useState(0);
  const [isOpen, setIsOpen] = useBoolean(false);

  return (
    <>
      <Flex alignItems="center" mt="10" height="100%" direction="column">
        <Heading color={useColorModeValue("orange.400", "orange.300")} size="4xl" as="h1">
          Cheemscoin
        </Heading>
        <Heading mt="1">Making meme dreams into reality</Heading>

        <Popover isOpen={isOpen} placement="top" onClose={setIsOpen.off}>
          <PopoverTrigger>
            <Image
              my="7"
              src="cheemscoin.png"
              maxBlockSize="20rem"
              animation={doSpin ? `spin ${animationTime}s ease-in-out` : undefined}
              draggable="false"
              onClick={() => {
                setDoSpin(true);
                setAnimationTime(a => a * 0.9);
                setSpinCount(c => c + 1);
                if (spinCount === 10) setIsOpen.on();
              }}
              onAnimationEnd={() => setDoSpin(false)}
              cursor="pointer"
            />
          </PopoverTrigger>
          <PopoverContent>
            <PopoverHeader>whamt the fumk</PopoverHeader>
            <PopoverArrow />
            <PopoverCloseButton />
          </PopoverContent>
        </Popover>
        <AddToMetamask />

        {/* <iframe
          src="https://discord.com/widget?id=807526182677512202"
          width="300"
          height="400"
          sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
        /> */}
      </Flex>
      <CTA />
    </>
  );
};

export default Index;
