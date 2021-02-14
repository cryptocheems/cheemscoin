import { IconButton } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

interface IconLinkProps {
  href: string;
  label: string;
  icon: any;
}

export const IconLink: React.FC<IconLinkProps> = ({ href, label, icon }) => {
  return (
    <Link href={href}>
      <IconButton icon={icon} aria-label={label} color="#1A202C" />
    </Link>
  );
};
