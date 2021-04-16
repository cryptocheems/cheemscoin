import {
  Heading,
  useBoolean,
  useColorModeValue,
  Flex,
  Box,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { ExtLink } from "../components/ExtLink";
import { Section } from "../components/Section";

const Index = () => {
  const [doSpin, setDoSpin] = useState(false);
  const [animationTime, setAnimationTime] = useState(1 / 0.9);
  const [spinCount, setSpinCount] = useState(0);
  const [isOpen, setIsOpen] = useBoolean(false);

  return (
    <>
      <Section>
        <Box maxW="container.sm" mb="5" mx="2">
          <Heading mb="1">Community</Heading>
          <Text>
            Cheemscoin was born from a{" "}
            <ExtLink href="https://www.reddit.com/r/dogelore/comments/lcwgj7/all_new_and_innovative_idea/">
              meme
            </ExtLink>{" "}
            posted on Reddit. A commenter quickly developed the ERC20 token and deployed it on the{" "}
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
      </Section>
    </>
  );
};

export default 404;
