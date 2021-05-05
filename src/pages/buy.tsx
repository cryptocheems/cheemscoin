import { Text } from "@chakra-ui/react";
import { Container } from "../components/Container";
import { ExtLink } from "../components/ExtLink";
import { buyLink } from "../constants";

// TODO: Make look nice and add tutorial

// ! This is very not finished
const Buy: React.FC = () => (
  <Container justifyContent="center">
    <Text fontStyle="italic">Note: This page is unfinished.</Text>
    <Text>
      The best place to buy from right now is{" "}
      <ExtLink plainbg href={buyLink}>
        Honeyswap
      </ExtLink>{" "}
      since it has the most liquidity by far.
    </Text>
    <Text>
      Check{" "}
      <ExtLink plainbg href="https://www.reddit.com/r/cryptocheems/comments/n47tn6">
        here
      </ExtLink>{" "}
      for other exchanges.
    </Text>
  </Container>
);
export default Buy;
