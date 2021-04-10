import { useColorModeValue, Flex } from "@chakra-ui/react";

interface SectionProps {
  colored?: boolean;
}

export const Section: React.FC<SectionProps> = ({ colored, children }) => {
  return (
    <Flex
      // TODO: Make line up with navbar
      // TODO: Consider using SimpleGrid instead
      color={colored ? useColorModeValue("white", "#1A202C") : undefined}
      bgColor={colored ? useColorModeValue("orange.500", "orange.200") : undefined}
      w="100%"
      py="10"
      px="5"
      justifyContent="space-evenly"
      alignItems="center"
      flexWrap={colored ? "wrap-reverse" : "wrap"}
      boxShadow={
        colored ? "0 0 6px 6px rgba(0, 0, 0, 0.1),0 0 4px 3px rgba(0, 0, 0, 0.06)" : undefined
      }
    >
      {children}
    </Flex>
  );
};
