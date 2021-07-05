import { Text } from "@chakra-ui/react";
import { ReactChild } from "react";

interface T2Props {
  primary: ReactChild;
  secondary: string;
}

// A table cell with 2 parts
// Future edit: now it's not actually a table cell
export const T2: React.FC<T2Props> = ({ primary, secondary }) => {
  return (
    <>
      <Text fontSize="xl">{primary}</Text>
      <Text fontSize="sm" textColor="grey">
        {secondary}
      </Text>
    </>
  );
};
