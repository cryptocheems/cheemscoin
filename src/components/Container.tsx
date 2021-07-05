import { Flex, FlexProps } from "@chakra-ui/react";

export const Container = (props: FlexProps) => (
  <Flex direction="column" alignItems="center" h="full" {...props} />
);
