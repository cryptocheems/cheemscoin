import { Flex, Heading, Link, Text, Button, Spinner } from "@chakra-ui/react";
import { useContractCall, useEthers } from "@usedapp/core";
import { DappProvider } from "../components/DappProvider";
import TokenLock from "../artifacts/TokenLock.json";
import { Interface } from "@ethersproject/abi";
import { LockBlock, iLock } from "../components/LockBlock";
import { Container } from "../components/Container";

const lAddress = "0x81DcF68dB2a0E03BAB0d4705E14282C4cDec64B8";

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
    <Container p="1" textAlign="center">
      <Button
        onClick={account ? deactivate : activateBrowserWallet}
        right="5px"
        top="20"
        position="absolute"
      >
        {account || "Connect Wallet"}
      </Button>
      <Heading mb="2">Token Locks</Heading>
      <Text mx="1">
        These tokens are locked in{" "}
        <Link href={"https://blockscout.com/xdai/mainnet/address/" + lAddress} isExternal>
          the TokenLock contract
        </Link>{" "}
        and can not be withdrawn until the dates shown
      </Text>

      <Flex mt="10" flexWrap="wrap">
        {requests?.map((l: iLock, i: number) => (
          <LockBlock lock={l} key={i} type="Unlockable" />
        ))}
        {locks ? (
          locks.map((l: iLock, i: number) => <LockBlock lock={l} key={i} type="Requestable" />)
        ) : (
          <Spinner />
        )}
      </Flex>
    </Container>
  );
};

const Locks: React.FC = () => (
  <DappProvider>
    <LocksPage />
  </DappProvider>
);

export default Locks;
