import { Heading, Spinner, Stack } from "@chakra-ui/react";
import { BigNumber, FixedNumber } from "@ethersproject/bignumber";
import { useTokenBalance } from "@usedapp/core";
import { cheemsAddress, farmAddress, totalCheems } from "../../constants";
import { useBalances } from "../../hooks/useBalances";
import { usePrice } from "../../hooks/usePrice";
import { PoolDetails } from "../../types";
import { removeDecimal } from "../../utils";
import { Asset } from "./Asset";
import { DataList } from "./DataList";
import { Countdown } from "./Countdown";

interface StatsProps {
  pools: PoolDetails[];
  endTime: BigNumber;
}

export const Stats: React.FC<StatsProps> = ({ pools, endTime }) => {
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

  if (tvl.isZero() || !cheems) return <Spinner />;

  const remaining = FixedNumber.fromValue(cheems, 18);
  const harvested = totalCheems.subUnsafe(remaining);

  return (
    <>
      <Stack spacing="3" mb="5" px="2">
        <Heading mb="1">Total Value Locked: ${removeDecimal(tvl)}</Heading>
        <Heading fontSize="2xl">Cheemscoin Harvested: {removeDecimal(harvested)}</Heading>
        <Heading fontSize="2xl">Cheemscoin Remaining: {removeDecimal(remaining)}</Heading>
        <Countdown fontSize="2xl" endTime={endTime} text={"Time Remaining"} />
      </Stack>
      <DataList
        headings={["Asset", "Amount Deposited", "Total Value"]}
        items={pools.map((pool, index) => [
          <Asset asset={pool} />,
          balances[index].toString(),
          "$" + removeDecimal(values[index]),
        ])}
      />
    </>
  );
};
