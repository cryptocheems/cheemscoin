import {
  Button,
  useRadioGroup,
  Spinner,
  Text,
  Flex,
  useToast,
} from "@chakra-ui/react";
import {
  ChainId,
  useContractCall,
  useContractFunction,
  useEthers,
  useNotifications,
} from "@usedapp/core";
import { ConnectWallet } from "../components/ConnectWallet";
import { Container } from "../components/Container";
import { RadioCard } from "../components/farm/RadioCard";
import { useState } from "react";
import {
  farmAddress,
  iFarm,
  farmContract,
  notificationInfo,
  maxLock,
} from "../constants";
import { BigNumber } from "@ethersproject/bignumber";
import { Asset } from "../components/farm/Asset";
import { TPrice } from "../components/farm/TPrice";
import { DepositDetails, PoolDetails } from "../types";
import { useCheemsPrice } from "../hooks/useCheemsPrice";
import { usePrice } from "../hooks/usePrice";
import { now } from "../utils";
import { AddXdaiToMetamask } from "../components/AddToMetamask";
import { Stats } from "../components/farm/Stats";
import { DataList } from "../components/farm/DataList";
import { Countdown } from "../components/farm/Countdown";

const FarmPage: React.FC = () => {
  const { account: accountOrNull } = useEthers();
  const account = accountOrNull ?? "0x000000000000000000000000000000000000dEaD";

  const [pools]: PoolDetails[][] =
    useContractCall({
      abi: iFarm,
      address: farmAddress,
      args: [],
      method: "getAllPools",
    }) ?? [];
  const [accountDeposits]: DepositDetails[][] =
    useContractCall({
      abi: iFarm,
      address: farmAddress,
      args: [account],
      method: "getAccountDeposits",
    }) ?? [];
  const [endTime]: BigNumber[] = useContractCall({
    abi: iFarm,
    address: farmAddress,
    args: [],
    method: "endTime",
  }) ?? [BigNumber.from(now() + maxLock * 24 * 3600)];
  const daysRemaining = Math.ceil((endTime.toNumber() - now()) / (24 * 3600));

  const [currentPage, setCurrentPage] = useState("My Deposits");
  const pages = ["My Deposits", "Stats"];
  const { getRootProps, getRadioProps } = useRadioGroup({
    defaultValue: "My Deposits",
    onChange: setCurrentPage,
  });
  const group = getRootProps();

  const { send: withdraw } = useContractFunction(farmContract, "closeDeposit", {
    transactionName: "Withdrawal",
  });
  const { send: harvest } = useContractFunction(farmContract, "withdrawRewards", {
    transactionName: "Harvest",
  });
  
  const { notifications } = useNotifications();
  const toast = useToast();
  notifications.forEach(n => {
    !toast.isActive(n.id) &&
      toast({
        title: notificationInfo(n).title,
        description: notificationInfo(n).description,
        status: notificationInfo(n).status,
        id: n.id,
        isClosable: true,
        position: "bottom-left",
        duration: n.type === "walletConnected" ? 3000 : 10000,
      });
  });

  return pools ? (
    <>
      <Flex {...group} mb="5" mt="2" flexWrap="wrap" justifyContent="center">
        {pages.map(value => {
          const radio = getRadioProps({ value });
          return (
            <RadioCard key={value} {...radio}>
              {value}
            </RadioCard>
          );
        })}
      </Flex>

      {daysRemaining > maxLock && (
        <Countdown adjustDays={maxLock} endTime={endTime} text={"Rewards start in"} mb="6" />
      )}

      {currentPage === "My Deposits" ? (
        <>
          <DataList
            headings={[
              "Deposit Asset",
              "Deposit Balance",
              "Unlock Date",
              "Unclaimed Cheems",
              "",
              "",
            ]}
            items={accountDeposits.map(d => {
              const unlockTime = new Date(d.unlockTime.toNumber() * 1000);

              return [
                <Asset asset={d} />,
                <TPrice
                  amount={d.balance}
                  priceFn={usePrice}
                  priceArgs={[d.poolToken]}
                  decimals={7}
                />,
                `${unlockTime.toDateString()}, ${unlockTime.toLocaleTimeString()}`,
                <TPrice amount={d.pendingReward} priceFn={useCheemsPrice} />,
                <Button
                  colorScheme="orange"
                  onClick={() => withdraw(d.id)}
                  disabled={d.unlockTime.toNumber() > now()}
                >
                  Withdraw
                </Button>,
                <Button colorScheme="orange" onClick={() => harvest(d.id)}>
                  Harvest
                </Button>,
              ];
            })}
          />
        </>
      ) :  (
        <Stats pools={pools} endTime={endTime} />
      )}

    </>
  ) : (
    <Spinner />
  );
};

const Farm: React.FC = () => {
  const { chainId } = useEthers();

  return (
    <Container>
      <ConnectWallet />

      {chainId === ChainId.xDai ? (
        <FarmPage />
      ) : (
        <>
          <Text mb="5">Unsupported network. Please switch to xDai</Text>
          <AddXdaiToMetamask />
        </>
      )}
      
     
    </Container>
  );
};

export default Farm;
