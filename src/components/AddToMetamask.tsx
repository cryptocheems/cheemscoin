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
          address: "0xEaF7B3376173DF8BC0C22Ad6126943cC8353C1Ee",
          symbol: "CHEEMS",
          decimals: 18,
          image:
            "https://raw.githubusercontent.com/kowasaur/cheemscoin/main/public/cheemscoinSmall.png",
        },
      },
    });
  }
  return (
    <Button onClick={add} colorScheme="orange" variant="outline">
      Add To Metamask
    </Button>
  );
};
