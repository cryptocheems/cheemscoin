import { Flex, useColorModeValue, Button, ButtonProps, Stack } from "@chakra-ui/react";
import { FaDiscord, FaGithub, FaReddit, FaTwitter } from "react-icons/fa";
import { buyLink, honeyswapLink } from "../constants";

interface FooterLink extends ButtonProps {
  href: string;
}

const FooterLink: React.FC<FooterLink> = props => (
  <Button
    variant="link"
    {...props}
    justifyContent="left"
    color={useColorModeValue("white", "#1A202C")}
    fontSize="1.05em"
  >
    <a href={props.href} target="_blank" rel="noopener noreferrer">
      {props.children}
    </a>
  </Button>
);

export const Footer: React.FC = () => (
  <Flex
    bg={useColorModeValue("orange.500", "orange.200")}
    w="100%"
    pt="5rem"
    pb="3rem"
    px="5"
    flexWrap="wrap"
    justifyContent="space-evenly"
    boxShadow="0 0 6px 6px rgba(0, 0, 0, 0.1),0 0 4px 3px rgba(0, 0, 0, 0.06)"
    // ! This is just temporary while there's no stats thing
    mt="10"
  >
    <Stack>
      <FooterLink href="http://github.cheemsco.in" leftIcon={<FaGithub />}>
        GitHub
      </FooterLink>
      <FooterLink href="http://discord.cheemsco.in" leftIcon={<FaDiscord />}>
        Discord
      </FooterLink>
      <FooterLink href="http://reddit.cheemsco.in" leftIcon={<FaReddit />}>
        Reddit
      </FooterLink>
      <FooterLink href="http://twitter.cheemsco.in" leftIcon={<FaTwitter />}>
        Twitter
      </FooterLink>
    </Stack>
    <Stack>
      <FooterLink href="https://docs.cheemsco.in">Docs</FooterLink>
      <FooterLink href={honeyswapLink}>Honeyswap</FooterLink>
    </Stack>
    <Stack>
      <FooterLink href="/contact">Contact</FooterLink>
      {/* TODO: Change back */}
      <FooterLink href={buyLink}>Buy</FooterLink>
      <FooterLink href="/farm">Farm</FooterLink>
      <FooterLink href="/locks">Token Locks</FooterLink>
    </Stack>
  </Flex>
);
