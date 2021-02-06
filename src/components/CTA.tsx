import { Link as ChakraLink, Button } from "@chakra-ui/react";

import { Container } from "./Container";

export const CTA = () => (
  <Container flexDirection="row" position="fixed" bottom="0" width="100%" maxWidth="35rem" py={2}>
    <ChakraLink
      isExternal
      href="https://github.com/kowasaur/drizzle-next-typescript"
      flexGrow={1}
      mx={2}
    >
      <Button width="100%" variant="outline" colorScheme="green">
        View Repo
      </Button>
    </ChakraLink>
  </Container>
);
