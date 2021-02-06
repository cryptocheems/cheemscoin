import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useColorMode, IconButton } from "@chakra-ui/react";

export const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  return (
    <IconButton
      // position="fixed"
      // top="1rem"
      // right="1rem"
      color="#1A202C"
      icon={isDark ? <MoonIcon /> : <SunIcon />}
      onClick={toggleColorMode}
      aria-label="toggle nightmode"
    />
  );
};
