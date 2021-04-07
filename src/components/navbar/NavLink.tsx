import NLink from "next/link";
import { Link } from "@chakra-ui/react";

interface NavLinkProps {
  href: string;
}

export const NavLink: React.FC<NavLinkProps> = props => {
  return (
    <NLink href={props.href}>
      <Link fontWeight="550" fontSize="lg" mr="1.1rem" {...props}>
        {props.children}
      </Link>
    </NLink>
  );
};
