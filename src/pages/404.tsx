import { Heading, Box, Text, Flex } from "@chakra-ui/react";
import { Section } from "../components/Section";

export default () => {
  return (
    <Flex h="100%">
      <Section>
        <Box maxW="container.sm" mb="5" mx="2">
          <Heading mb="1">404</Heading>
          <Text>This page does not exist or has been removed.</Text>
        </Box>
      </Section>
    </Flex>
  );
};
