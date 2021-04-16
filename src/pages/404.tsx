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

  return (
    <>
      <Section>
        <Box maxW="container.sm" mb="5" mx="2">
          <Heading mb="1">404</Heading>
          <Text>
            This page does not exist or has been removed.
          </Text>
        </Box>
      </Section>
    </>
  );
};

export default 404;
