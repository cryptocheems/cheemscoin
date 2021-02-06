import { Button } from "@chakra-ui/react";
import React from "react";

export const AddToMetamask: React.FC = () => {
  async function add() {
    // @ts-ignore
    await window.ethereum.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20",
        options: {
          address: "0x16471F90e21ACF55f4F7ed8247b7759E7f7003Eb", // TODO Use xDai address
          symbol: "CHEEMS",
          decimals: 18,
          image: "https://i.imgur.com/3O6Wtcq.png", // TODO Make this link the one on github and make it smaller
        },
      },
    });
  }
  return <Button onClick={add}>Add To Metamask</Button>;
};
