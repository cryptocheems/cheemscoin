import { Td } from "@chakra-ui/react";
import { FixedNumber } from "@ethersproject/bignumber";
import { useCheemsPrice } from "../../hooks/useCheemsPrice";
import { usePrice } from "../../hooks/usePrice";
import { PoolDetails } from "../../types";

interface TYieldProps {
  pool: PoolDetails;
  days: number;
}

export const TYield: React.FC<TYieldProps> = ({ pool, days }) => {
  const cheemsPrice = FixedNumber.from((useCheemsPrice() * days).toString());
  const cheemsAmount = FixedNumber.from(pool.hsfInDay);
  const lpPrice = FixedNumber.from(usePrice(pool.poolToken).toString());
  const lpBalance = FixedNumber.from(pool.poolTokenBalance);

  if (cheemsPrice.isZero() || lpPrice.isZero() || lpBalance.isZero()) return <Td></Td>;

  const result = cheemsPrice.mulUnsafe(cheemsAmount).divUnsafe(lpPrice.mulUnsafe(lpBalance));

  return <Td>{result.round(2).toString()}%</Td>;
};
