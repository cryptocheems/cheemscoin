import { useColorModeValue } from "@chakra-ui/color-mode";
import { Link, LinkProps } from "@chakra-ui/layout";

interface ExtLinkProps extends LinkProps {
  plainbg?: boolean;
}

export const ExtLink: React.FC<ExtLinkProps> = ({ plainbg, children, ...props }) => {
  return (
    <Link
      color={
        plainbg
          ? useColorModeValue("orange.500", "orange.300")
          : useColorModeValue("yellow", "orangered")
      }
      fontWeight="500"
      isExternal
      {...props}
    >
      {children}
    </Link>
  );
};
