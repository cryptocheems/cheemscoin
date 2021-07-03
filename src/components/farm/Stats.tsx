import { Heading, Table, Td, Th, Tr, Spinner, Stack } from "@chakra-ui/react";
import { BigNumber, FixedNumber } from "@ethersproject/bignumber";
import { useContractCall, useTokenBalance } from "@usedapp/core";
import { useEffect, useState } from "react";
import { cheemsAddress, farmAddress, iFarm, totalCheems } from "../../constants";
import { useBalances } from "../../hooks/useBalances";
import { usePrice } from "../../hooks/usePrice";
import { PoolDetails } from "../../types";
import { now, removeDecimal, secondsToDays } from "../../utils";
import { Asset } from "./Asset";

interface StatsProps {
  pools: PoolDetails[];
}

export const Stats: React.FC<StatsProps> = ({ pools }) => {
  const prices = pools
    .map(pool => usePrice(pool.poolToken))
    .map(p => FixedNumber.from(p.toString()));
  const balances = useBalances(
    pools.map(p => p.poolToken),
    farmAddress
  ).map(b => (b ? FixedNumber.fromValue(b[0], 18) : FixedNumber.from(0)));
  const values = balances.map((b, i) => b.mulUnsafe(prices[i]));

  const tvl = values.reduce((accumulator, currentValue) => accumulator.addUnsafe(currentValue));

  const cheems = useTokenBalance(cheemsAddress, farmAddress);
  const [endTime]: BigNumber[] =
    useContractCall({
      abi: iFarm,
      address: farmAddress,
      args: [],
      method: "endTime",
    }) ?? [];

  // https://stackoverflow.com/a/66044632/13837629
  const [currentTime, setCurrentTime] = useState(now());
  useEffect(() => {
    const timerId = setInterval(() => setCurrentTime(now()));
    return () => clearInterval(timerId);
  }, []);

  if (tvl.isZero() || !cheems || !endTime) return <Spinner />;

  const remaining = FixedNumber.fromValue(cheems, 18);
  const harvested = totalCheems.subUnsafe(remaining);

  return (
    <>
      <Stack spacing="3">
        <Heading mb="1">Total Value Locked: ${removeDecimal(tvl)}</Heading>
        <Heading fontSize="2xl">Cheemscoin Harvested: {removeDecimal(harvested)}</Heading>
        <Heading fontSize="2xl">Cheemscoin Remaining: {removeDecimal(remaining)}</Heading>
        <Heading fontSize="2xl">
          Time Remaining: {secondsToDays(endTime.toNumber() - currentTime)}
        </Heading>
      </Stack>
      <Table mt="6">
        <Tr>
          <Th>Asset</Th>
          <Th>Amount Deposited</Th>
          <Th>Total Value</Th>
        </Tr>
        {pools.map((pool, index) => (
          <Tr>
            <Asset asset={pool} />
            <Td>{balances[index].toString()}</Td>
            <Td>${removeDecimal(values[index])}</Td>
          </Tr>
        ))}
      </Table>
    </>
  );
};
