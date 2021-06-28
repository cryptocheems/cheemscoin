import { BigNumber } from "@ethersproject/bignumber";
import { useContractCall, ERC20Interface } from "@usedapp/core";

export function useAllowance(address: string, account: string, spender: string) {
  const [allowance]: BigNumber[] =
    useContractCall({
      abi: ERC20Interface,
      address,
      method: "allowance",
      args: [account, spender],
    }) ?? [];
  return allowance;
}
