import { tokenDetails } from "../../constants";
import { Details } from "../../types";
import { T2 } from "./T2";
import { Link } from "@chakra-ui/react";

interface AssetProps {
  asset: Details;
}

export const Asset: React.FC<AssetProps> = ({ asset }) => {
  const token = tokenDetails(asset.poolToken);
  return (
    <T2
      primary={
        <Link href={token.url} isExternal>
          {token.name}
        </Link>
      }
      secondary={token.exchange}
    />
  );
};
