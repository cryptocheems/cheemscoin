import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const fonts = { mono: `'Menlo', monospace` };

const breakpoints = createBreakpoints({
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
});

const theme = extendTheme({
  colors: {
    black: "#16161D",
  },
  fonts,
  breakpoints,
  config: {
    useSystemColorMode: true,
  },
  styles: {
    global: props => ({
      ".pure-form > *": {
        display: "block",
        borderWidth: "1px",
        borderRadius: "0.5em",
        padding: "0.5em",
        w: "100%",
      },
      ".pure-form > input": {
        mb: 7,
        bg: "transparent",
      },
      ".pure-button": {
        bg: props.colorMode === "dark" ? "green.200" : "green.500",
        color: props.colorMode === "dark" ? "#1A202C" : "white",
        fontWeight: "600",
      },
    }),
  },
});

export default theme;
