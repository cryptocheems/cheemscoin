import { Td, Text } from "@chakra-ui/react";
import { ReactChild } from "react";

interface T2Props {
  primary: ReactChild;
  secondary: string;
}

// A table cell with 2 parts
export const T2: React.FC<T2Props> = ({ primary, secondary }) => {
  return (
    <Td fontSize="xl">
      {primary}

      <Text fontSize="sm" textColor="grey">
        {secondary}
      </Text>
    </Td>
  );
};
