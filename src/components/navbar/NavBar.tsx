import { Box, Flex, Icon, useColorModeValue } from "@chakra-ui/react";
import { DarkModeSwitch } from "./DarkModeSwitch";
import { IconLink } from "./IconLink";
import { FaDiscord } from "react-icons/fa";
import { NavLink } from "./NavLink";

export const NavBar: React.FC = ({}) => (
  <Flex
    bg={useColorModeValue("orange.500", "orange.200")}
    p={4}
    w="100%"
    shadow="md"
    as="header"
    justifyContent="center"
  >
    <Flex
      color={useColorModeValue("white", "#1A202C")}
      align="center"
      justify="space-between"
      as="nav"
      maxW="69rem"
      w="100%"
    >
      <Box>
        <IconLink
          mr="1.2rem"
          href="/"
          borderRadius="full"
          aria-label="Home"
          icon={
            <Icon viewBox="0 0 240 200" boxSize="8">
              <g
                transform="translate(0.000000,198.000000) scale(0.100000,-0.100000)"
                fill="#1A202C"
                stroke="none"
              >
                <path
                  d="M590 1891 c-5 -11 -10 -45 -10 -75 0 -32 -4 -56 -10 -56 -14 0 -60
-46 -60 -60 0 -5 -5 -10 -11 -10 -27 0 -103 -114 -147 -220 -6 -14 -13 -47
-16 -75 -3 -27 -12 -87 -19 -132 l-12 -81 -83 -81 c-45 -44 -82 -87 -82 -95 0
-9 -11 -23 -24 -31 -25 -17 -43 -64 -29 -74 4 -3 15 -19 24 -35 11 -19 34 -36
65 -48 26 -11 54 -28 62 -39 11 -16 25 -19 81 -19 106 0 129 -7 148 -48 15
-31 15 -48 5 -161 -7 -69 -12 -154 -12 -189 l0 -62 86 -57 c89 -57 208 -111
323 -145 53 -15 112 -20 304 -25 158 -4 237 -3 237 4 0 6 24 13 54 17 29 3 66
13 82 21 16 8 36 15 44 15 9 0 24 6 35 14 11 7 31 16 45 19 35 9 198 116 247
163 23 21 55 49 72 62 38 28 152 170 177 220 11 20 22 39 25 42 17 16 39 57
39 75 0 11 9 27 20 35 11 8 31 44 44 80 38 102 40 110 21 110 -9 0 -21 13 -27
31 -6 17 -27 41 -49 55 -22 13 -39 29 -39 34 0 5 -21 33 -46 62 -27 29 -71
101 -103 165 -96 194 -100 202 -124 214 -24 13 -41 34 -73 88 -11 20 -42 50
-69 66 -26 17 -70 51 -97 78 -27 26 -68 57 -90 68 -37 19 -51 20 -141 14 -58
-4 -102 -4 -106 2 -3 5 -46 14 -95 20 -48 6 -92 16 -96 23 -5 9 -59 12 -201
12 -149 0 -199 3 -216 14 -13 8 -48 14 -82 14 -49 0 -62 -4 -71 -19z"
                />
              </g>
            </Icon>
          }
        />
        <NavLink href="/buy">Buy</NavLink>
        <NavLink href="/locks">Locks</NavLink>
      </Box>
      <Box>
        <IconLink
          href="http://discord.cheemsco.in"
          icon={<FaDiscord size="25" />}
          aria-label="Discord"
          mr="3"
        />
        <DarkModeSwitch />
      </Box>
    </Flex>
  </Flex>
);
