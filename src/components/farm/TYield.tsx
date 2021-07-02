import { Td } from "@chakra-ui/react";
import { FixedNumber } from "@ethersproject/bignumber";
import { useCheemsPrice } from "../../hooks/useCheemsPrice";
import { usePrice } from "../../hooks/usePrice";
import { PoolDetails } from "../../types";

interface TYieldProps {
  pool: PoolDetails;
  days: number;
}

export function calcYield(pool: PoolDetails, days: number) {
  const cheemsPrice = FixedNumber.from((useCheemsPrice() * days).toString());
  const cheemsAmount = FixedNumber.from(pool.hsfInDay);
  const lpPrice = FixedNumber.from(usePrice(pool.poolToken).toString());
  const lpBalance = FixedNumber.from(pool.poolTokenBalance);

  if (cheemsPrice.isZero() || lpPrice.isZero() || lpBalance.isZero()) return FixedNumber.from(0);

  return cheemsPrice.mulUnsafe(cheemsAmount).divUnsafe(lpPrice.mulUnsafe(lpBalance));
}

export const TYield: React.FC<TYieldProps> = ({ pool, days }) => {
  const result = calcYield(pool, days);

  return <Td>{result.isZero() ? "" : result.round(2).toString() + "%"}</Td>;
};
