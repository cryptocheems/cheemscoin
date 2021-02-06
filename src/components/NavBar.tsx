import { Flex, Text, useColorMode } from "@chakra-ui/react";
import React from "react";
import { DarkModeSwitch } from "./DarkModeSwitch";
// @ts-ignore
import { drizzleReactHooks } from "@drizzle/react-plugin";

const { useDrizzleState } = drizzleReactHooks;

export const NavBar: React.FC = ({}) => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const state = useDrizzleState((state: any) => state);

  return (
    <Flex
      bg={isDark ? "green.200" : "green.500"}
      p={4}
      w="100%"
      color={isDark ? "#1A202C" : "white"}
      align="center"
      justify="right"
    >
      <Text d="inline" mr={4}>
        {state.accounts[0]}
      </Text>
      <DarkModeSwitch />
    </Flex>
  );
};
