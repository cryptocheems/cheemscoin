// This is a table for desktop and a bunch of boxes for mobile

import {
  Box,
  Text,
  Table,
  Tr,
  Th,
  Td,
  Thead,
  Tbody,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react";

import { ReactNode } from "react";

interface DataListProps {
  headings: string[];
  items: ReactNode[][];
}

export const DataList: React.FC<DataListProps> = ({ headings, items }) => {
  const isMobile = useBreakpointValue({ base: true, sm: false });
  const headingColor = useColorModeValue("gray.600", "gray.400");

  return isMobile ? (
    <Box w="100%" h="100%" overflow="auto">
      {items.map((nodes, i) => (
        <Box borderWidth="thin" w="100%" mt="2" p="6" pb="2" borderRadius="15" key={i}>
          {headings.map((heading, j) => (
            <Box key={j} mb="4">
              <Text color={headingColor} textTransform="uppercase" fontWeight="bold" fontSize="xs">
                {heading}
              </Text>
              {nodes[j]}
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  ) : (
    <Table>
      <Thead>
        <Tr>
          {headings.map((heading, i) => (
            <Th key={i}>{heading}</Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {items.map((nodes, i) => (
          <Tr key={i}>
            {nodes.map((node, j) => (
              <Td key={j}>{node}</Td>
            ))}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
