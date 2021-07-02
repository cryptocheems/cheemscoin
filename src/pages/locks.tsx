import { Flex, Heading, Link, Text, Spinner } from "@chakra-ui/react";
import { useContractCall } from "@usedapp/core";
import TokenLock from "../artifacts/TokenLock.json";
import { Interface } from "@ethersproject/abi";
import { LockBlock, iLock } from "../components/LockBlock";
import { Container } from "../components/Container";
import { ConnectWallet } from "../components/ConnectWallet";

const lAddress = "0x81DcF68dB2a0E03BAB0d4705E14282C4cDec64B8";

const Locks: React.FC = () => {
  const [locks] =
    useContractCall({
      abi: new Interface(TokenLock.abi),
      address: lAddress,
      args: [],
      method: "getLocks",
    }) ?? [];
  const [requests] =
    useContractCall({
      abi: new Interface(TokenLock.abi),
      address: lAddress,
      args: [],
      method: "getRequests",
    }) ?? [];

  return (
    <Container p="1" textAlign="center">
      <ConnectWallet />
      <Heading mb="2">Token Locks</Heading>
      <Text mx="1">
        These tokens are locked in{" "}
        <Link href={"https://blockscout.com/xdai/mainnet/address/" + lAddress} isExternal>
          the TokenLock contract
        </Link>{" "}
        and cannot be withdrawn until the dates shown
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

export default Locks;
