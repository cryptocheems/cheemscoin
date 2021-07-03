import { Heading, Table, Td, Th, Tr, Spinner, Stack } from "@chakra-ui/react";
import { FixedNumber } from "@ethersproject/bignumber";
import { useTokenBalance } from "@usedapp/core";
import { cheemsAddress, farmAddress, totalCheems } from "../../constants";
import { useBalances } from "../../hooks/useBalances";
import { usePrice } from "../../hooks/usePrice";
import { PoolDetails } from "../../types";
import { removeDecimal } from "../../utils";
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

  if (tvl.isZero() || !cheems) return <Spinner />;

  const remaining = FixedNumber.fromValue(cheems, 18);
  const harvested = totalCheems.subUnsafe(remaining);

  return (
    <Stack alignItems="center" spacing="5">
      <Heading>Total Value Locked: ${removeDecimal(tvl)}</Heading>
      <Stack>
        <Heading fontSize="2xl">Cheemscoin Harvested: {removeDecimal(harvested)}</Heading>
        <Heading fontSize="2xl">Cheemscoin Remaining: {removeDecimal(remaining)}</Heading>
      </Stack>
      <Table>
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
    </Stack>
  );
};
