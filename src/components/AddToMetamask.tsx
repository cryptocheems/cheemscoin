import { Button, Flex } from "@chakra-ui/react";
import React from "react";

const AddCheemsToMetamask: React.FC = () => {
  async function add() {
    // @ts-expect-error
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
    <Button onClick={add} colorScheme="orange">
      Add Cheemscoin To Metamask
    </Button>
  );
};

export const AddXdaiToMetamask: React.FC = () => {
  async function add() {
    // @ts-expect-error
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: "0x64",
          chainName: "xDai Chain",
          nativeCurrency: {
            name: "xDai",
            symbol: "xDAI",
            decimals: 18,
          },
          rpcUrls: [
            "https://rpc.xdaichain.com/",
            "https://xdai.1hive.org/",
            "https://dai.poa.network/",
            "https://xdai.poanetwork.dev/",
          ],
          blockExplorerUrls: ["https://blockscout.com/xdai/mainnet"],
          iconUrls: [
            "https://assets.coingecko.com/coins/images/14584/small/1_evbI9uxxj2OkBaWNpWcssw.png",
          ],
        },
      ],
    });
  }

  return (
    <Button onClick={add} colorScheme="orange" variant="outline" mb="3">
      Add xDai to Metamask
    </Button>
  );
};

export const AddToMetamask: React.FC = () => (
  <Flex flexDirection="column">
    <AddXdaiToMetamask />
    <AddCheemsToMetamask />
  </Flex>
);
