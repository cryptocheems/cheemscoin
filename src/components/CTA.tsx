import { Link, Button } from "@chakra-ui/react";

import { Container } from "./Container";

export const CTA = () => (
  <Container
    flexDirection="row"
    position="relative"
    bottom="0"
    width="100%"
    maxWidth="45rem"
    py={2}
    mt={5}
    px={1}
  >
    <Link isExternal href="https://github.com/cryptocheems/cheemscoin" flexGrow={1} mx={1}>
      <Button width="100%" variant="outline" colorScheme="orange">
        Github
      </Button>
    </Link>
    <Link isExternal href="https://discord.gg/wdt6swb3H8" flexGrow={1} mx={1}>
      <Button width="100%" colorScheme="orange" variant="outline">
        Discord
      </Button>
    </Link>
    <Link isExternal href="https://reddit.com/r/cryptocheems" flexGrow={1} mx={1}>
      <Button width="100%" colorScheme="orange" variant="outline">
        Reddit
      </Button>
    </Link>
  </Container>
);
