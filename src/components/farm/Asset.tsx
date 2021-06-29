import { tokenDetails } from "../../constants";
import { Details } from "../../types";
import { T2 } from "./T2";

interface AssetProps {
  asset: Details;
}

export const Asset: React.FC<AssetProps> = ({ asset }) => (
  <T2
    primary={tokenDetails(asset.poolToken).name}
    secondary={tokenDetails(asset.poolToken).exchange}
  />
);
