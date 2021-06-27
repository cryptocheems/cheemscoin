import { Button } from "@chakra-ui/react";
import { shortenIfAddress, useEthers } from "@usedapp/core";

export const ConnectWallet: React.FC = () => {
  const { activateBrowserWallet, account, deactivate } = useEthers();
  return (
    <Button
      onClick={account ? deactivate : () => activateBrowserWallet()}
      right="5px"
      top="20"
      position="absolute"
      colorScheme="green"
    >
      {shortenIfAddress(account) || "Connect Wallet"}
    </Button>
  );
};
