import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useColorMode, IconButton, useColorModeValue } from "@chakra-ui/react";

export const DarkModeSwitch = () => {
  const { toggleColorMode } = useColorMode();

  return (
    <IconButton
      color="#1A202C"
      icon={useColorModeValue(<SunIcon boxSize="6" />, <MoonIcon boxSize="6" />)}
      onClick={toggleColorMode}
      aria-label="toggle nightmode"
      title="Toggle Nightmode"
      borderRadius="md"
    />
  );
};
