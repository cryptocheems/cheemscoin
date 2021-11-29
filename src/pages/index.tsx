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
  Box,
  Text,
} from "@chakra-ui/react";
import { AddToMetamask } from "../components/AddToMetamask";
import { useState } from "react";
import { ExtLink } from "../components/ExtLink";
import { Section } from "../components/Section";
import { Container } from "../components/Container";

const Index = () => {
  const [doSpin, setDoSpin] = useState(false);
  const [animationTime, setAnimationTime] = useState(1 / 0.9);
  const [spinCount, setSpinCount] = useState(0);
  const [isOpen, setIsOpen] = useBoolean(false);

  return (
    <>
      <Container mb="14" textAlign="center">
        <Heading color={useColorModeValue("orange.400", "orange.300")} size="4xl" as="h1">
          Cheemscoin
        </Heading>
        <Heading mt="1">Making Meme Dreams into Reality</Heading>

        <Popover isOpen={isOpen} placement="top" onClose={setIsOpen.off}>
          <PopoverTrigger>
            <Image
              my="7"
              src="cheemscoin.png"
              maxBlockSize="24rem"
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
      </Container>
      <Section colored>
        <iframe
          src="https://discord.com/widget?id=807526182677512202"
          width="300"
          height="350"
          sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
        />
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
      <Section>
        <Box maxW="container.sm" mb="5" mx="2">
          <Heading mb="1">Disease Fighting</Heading>
          <Text>
            Every week, thousands of Cheemscoin are distributed to people who fold to our
            Folding@home team,{" "}
            <ExtLink href="https://stats.foldingathome.org/team/1060762" plainbg>
              1060762
            </ExtLink>
            . Folding@home is a distributed computing project that helps scientists create
            therapeutics for a variety of diseases by simlutating proteins folding. Basically, you
            run a program on your computer and it helps fight diseases like Alzheimer's, Cancer and
            even COVID-19. Go{" "}
            <ExtLink href="https://foldingathome.org/home/" plainbg>
              here
            </ExtLink>{" "}
            to learn more. To incentivise people to participate, we reward them with Cheemscoin.
            This means you, yes you reading this, can earn Cheemscoin for FREE right now. Learn how{" "}
            <ExtLink
              // TODO: Make this on publish0x, medium or on this website
              href="https://www.reddit.com/r/cryptocheems/comments/m2ob9x/how_to_fold_for_cheemscoin_mining/"
              plainbg
            >
              here
            </ExtLink>{" "}
            and view past payouts{" "}
            <ExtLink href="http://sheets.cheemsco.in/" plainbg>
              here
            </ExtLink>
            .
          </Text>
        </Box>
        <Image src="mumchsciemce.webp" borderRadius="md" maxBlockSize="20rem" />
      </Section>
      <Section colored>
        <Image src="traditional.jpg" borderRadius="md" maxBlockSize="20rem" />
        <Box maxW="container.sm" mb="5" mx="2">
          <Heading d="flex" alignItems="center">
            Yield Farming and More
            <Text ml="2" fontSize="sm">
              Coming Soon
            </Text>
          </Heading>
          <Text>
            There's many new features in development including yield farming. This would be where
            you can deposit Cheemscoin Liquidity Provider Tokens into a contract and you earn
            Cheemscoin on it. You're also going to be able to use Cheemscoin to receive airdrops of
            new tokens the dev creates. You can see everything planned and in progress{" "}
            <ExtLink href="https://github.com/cryptocheems/cheemscoin/projects/1">here</ExtLink>.
          </Text>
        </Box>
      </Section>
      {/* // TODO: Stats like price, max supply, circulating supply, etc  */}
    </>
  );
};

export default Index;
