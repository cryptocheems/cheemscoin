import { Button } from "@chakra-ui/button";
import { Flex, Heading, Link, Text } from "@chakra-ui/layout";
import { useContractCall, useEthers } from "@usedapp/core";
import { DappProvider } from "../components/DappProvider";
import TokenLock from "../artifacts/TokenLock.json";
import { Interface } from "@ethersproject/abi";
import { formatEther } from "@ethersproject/units";
import { BigNumberish } from "@ethersproject/bignumber";
import { Stat, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/stat";

type iLock = {
  token: string;
  amount: BigNumberish;
  requestTime: BigNumberish;
};

// TODO: Make these xDai accurate and do LP Tokens
const tokenNames: { [key: string]: string | undefined } = {
  "0x060153C56952571389507AA373FC39343607373f": "Cheemscoin",
};

const lAddress = "0xCc6566066b6b241A3a10231A01B22AF8B1509830";

const LocksPage: React.FC = () => {
  const { activateBrowserWallet, account, deactivate } = useEthers();

  const [locks] =
    useContractCall({
      // @ts-expect-error
      abi: new Interface(TokenLock.abi),
      address: lAddress,
      args: [],
      method: "getLocks",
    }) ?? [];

  return (
    <>
      <Button onClick={account ? deactivate : activateBrowserWallet}>
        {account || "Connect Wallet"}
      </Button>
      <Heading>Token Locks</Heading>
      <Text>
        These tokens are locked in{" "}
        <Link href={"https://blockscout.com/xdai/mainnet/address/" + lAddress}>{lAddress}</Link> and
        can not be withdrawn until the date shown
      </Text>
      <Flex>
        {locks?.map((a: iLock, i: number) => (
          <Stat borderWidth="thin" p="1em" borderRadius="2xl" key={i} mx="1">
            <StatLabel>
              <Link href={"https://blockscout.com/xdai/mainnet/tokens/" + a.token}>
                {tokenNames[a.token] ?? a.token}
              </Link>
            </StatLabel>
            <StatNumber>{formatEther(a.amount)}</StatNumber>
            <StatHelpText>
              Requestable from{" "}
              {new Date(Number(a.requestTime.toString()) * 1000).toLocaleDateString()}
            </StatHelpText>
          </Stat>
        ))}
      </Flex>
    </>
  );
};

const Locks: React.FC = () => (
  <DappProvider>
    <LocksPage />
  </DappProvider>
);

export default Locks;
