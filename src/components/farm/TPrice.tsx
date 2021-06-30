import { Td } from "@chakra-ui/react";
import { BigNumber, FixedNumber } from "@ethersproject/bignumber";
import { T2 } from "./T2";

interface TPriceProps {
  amount: BigNumber;
  priceFn: (...args: any[]) => number;
  priceArgs?: any[];
}

export const TPrice: React.FC<TPriceProps> = ({ amount, priceFn, priceArgs = [] }) => {
  const p = priceFn(...priceArgs);
  const a = FixedNumber.fromValue(amount, 18);
  const amountStr = a.round(2).toString();
  if (!p) return <Td>{amountStr}</Td>;

  const price = FixedNumber.from(p.toString());
  const total = a.mulUnsafe(price);
  const dollarStr = total.round(2).toString();

  return <T2 primary={amountStr} secondary={`$${dollarStr}`} />;
};
