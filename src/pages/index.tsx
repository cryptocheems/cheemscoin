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
  Box,
  Text,
} from "@chakra-ui/react";
import { CTA } from "../components/CTA";
import { AddToMetamask } from "../components/AddToMetamask";
import { useState } from "react";
import { ExtLink } from "../components/ExtLink";

const Index = () => {
  const [doSpin, setDoSpin] = useState(false);
  const [animationTime, setAnimationTime] = useState(1 / 0.9);
  const [spinCount, setSpinCount] = useState(0);
  const [isOpen, setIsOpen] = useBoolean(false);

  return (
    <>
      <Flex alignItems="center" my="10" height="100%" direction="column" textAlign="center">
        <Heading color={useColorModeValue("orange.400", "orange.300")} size="4xl" as="h1">
          Cheemscoin
        </Heading>
        <Heading mt="1">Making Meme Dreams into Reality</Heading>

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
            <PopoverHeader textAlign="center">whamt the fumk</PopoverHeader>
            <PopoverArrow />
            <PopoverCloseButton />
          </PopoverContent>
        </Popover>
        <AddToMetamask />
      </Flex>
      <Flex
        // TODO: Make line up with navbar
        // TODO: Consider using SimpleGrid instead
        mt="4"
        color={useColorModeValue("white", "#1A202C")}
        bgColor={useColorModeValue("orange.500", "orange.200")}
        w="100%"
        py="10"
        px="5"
        justifyContent="space-evenly"
        alignItems="center"
        flexWrap="wrap-reverse"
        boxShadow="0 0 6px 6px rgba(0, 0, 0, 0.1),0 0 4px 3px rgba(0, 0, 0, 0.06)"
      >
        <iframe
          src="https://discord.com/widget?id=807526182677512202"
          width="300"
          height="350"
          sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
        />
        <Box maxW="container.sm" mb="5" mx="2">
          <Heading mb="1">Community at Heart</Heading>
          <Text>
            Cheemscoin was born from a{" "}
            <ExtLink href="https://www.reddit.com/r/dogelore/comments/lcwgj7/all_new_and_innovative_idea/">
              meme
            </ExtLink>{" "}
            posted on Reddit. A commenter,{" "}
            <ExtLink href="https://github.com/kowasaur">kowasaur</ExtLink>, quickly developed the
            ERC20 token and deployed it on the{" "}
            <ExtLink href="https://www.xdaichain.com/">xDai Chain</ExtLink>. Within a few days, a
            vibrant community had begun and thousands of Cheemscoin were airdropped to community
            members. A <ExtLink href="https://www.reddit.com/r/cryptocheems">subreddit</ExtLink>,{" "}
            <ExtLink href="https://twitter.com/RealCheemsCoin">Twitter account</ExtLink> and{" "}
            <ExtLink href="http://discord.cheemsco.in">Discord server</ExtLink> were all created and
            managed by different members of the community. Today, anyone in the community can share
            anything such as a new idea or change they want made or even just a funny meme they
            found. Everyone is also free to contribute to the{" "}
            <ExtLink href="http://github.cheemsco.in">GitHub repository</ExtLink>.
          </Text>
        </Box>
      </Flex>
      <CTA />
    </>
  );
};

export default Index;
