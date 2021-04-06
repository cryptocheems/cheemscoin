import { Flex, Heading, Link, Text, Button, Spinner } from "@chakra-ui/react";
import { useContractCall, useEthers } from "@usedapp/core";
import { DappProvider } from "../components/DappProvider";
import TokenLock from "../artifacts/TokenLock.json";
import { Interface } from "@ethersproject/abi";
import { LockBlock, iLock } from "../components/LockBlock";

// TODO: Change this for xDai
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
  const [requests] =
    useContractCall({
      // @ts-expect-error
      abi: new Interface(TokenLock.abi),
      address: lAddress,
      args: [],
      method: "getRequests",
    }) ?? [];

  return (
    <>
      <Button
        onClick={account ? deactivate : activateBrowserWallet}
        right="5px"
        top="20"
        position="fixed"
      >
        {account || "Connect Wallet"}
      </Button>
      <Heading mt="2em" mb="2">
        Token Locks
      </Heading>
      <Text mx="1">
        These tokens are locked in{" "}
        <Link href={"https://blockscout.com/xdai/mainnet/address/" + lAddress}>{lAddress}</Link> and
        can not be withdrawn until the date shown
      </Text>

      <Flex mt="10">
        {requests?.map((l: iLock, i: number) => (
          <LockBlock lock={l} key={i} type="Unlockable" />
        ))}
        {locks ? (
          locks.map((l: iLock, i: number) => <LockBlock lock={l} key={i} type="Requestable" />)
        ) : (
          <Spinner />
        )}
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
