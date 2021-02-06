import { Flex, Heading } from "@chakra-ui/react";
import { ReactElement } from "react";

export const Hero = ({ title }: { title: string | ReactElement }) => (
  <Flex justifyContent="center" alignItems="center" height="30vh">
    <Heading fontSize="6vw">{title}</Heading>
  </Flex>
);

Hero.defaultProps = {
  title: "with-chakra-ui-typescript",
};
