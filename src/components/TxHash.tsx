import { Link } from "@chakra-ui/react";
import { ChainId, getExplorerTransactionLink, shortenIfTransactionHash } from "@usedapp/core";
import { Notification } from "../types";

interface TxHashProps {
  notification: Notification;
}

export const TxHash: React.FC<TxHashProps> = ({ notification }) => {
  const hash = notification.transaction?.hash;
  return (
    <Link isExternal href={getExplorerTransactionLink(hash!, ChainId.xDai)}>
      {shortenIfTransactionHash(hash)}
    </Link>
  );
};
