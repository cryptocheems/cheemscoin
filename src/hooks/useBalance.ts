import { BigNumber } from "@ethersproject/bignumber";
import { useContractCall, ERC20Interface } from "@usedapp/core";

export function useBalance(token: string, account: string) {
  const [balance]: BigNumber[] = useContractCall({
    abi: ERC20Interface,
    address: token,
    method: "balanceOf",
    args: [account],
  }) ?? [BigNumber.from(0)];
  return balance;
}
