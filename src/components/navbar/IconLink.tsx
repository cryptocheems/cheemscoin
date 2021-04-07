import { IconButton, IconButtonProps } from "@chakra-ui/react";
import Link from "next/link";

interface IconLinkProps extends IconButtonProps {
  href: string;
  icon: any;
}

export const IconLink: React.FC<IconLinkProps> = ({ href, icon, ...props }) => {
  return (
    <Link href={href}>
      <IconButton icon={icon} color="#1A202C" title={props["aria-label"]} {...props} />
    </Link>
  );
};
