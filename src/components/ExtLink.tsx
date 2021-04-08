import { useColorModeValue } from "@chakra-ui/color-mode";
import { Link, LinkProps } from "@chakra-ui/layout";

export const ExtLink: React.FC<LinkProps> = props => {
  return (
    <Link
      color={useColorModeValue("yellow", "orangered" /*or crimson*/)}
      fontWeight="500"
      isExternal
      {...props}
    >
      {props.children}
    </Link>
  );
};
