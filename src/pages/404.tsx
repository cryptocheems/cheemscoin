import { Heading, Box, Text } from "@chakra-ui/react";
import { Container } from "../components/Container";

export default () => {
  return (
    <Container justifyContent="center">
      <Box>
        <Heading mb="1"> Error 404</Heading>
        <Text>This page does not exist or has been removed.</Text>
      </Box>
    </Container>
  );
};
