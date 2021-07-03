import { BigNumber } from "@ethersproject/bignumber";
import { ERC20Interface, useContractCalls } from "@usedapp/core";

export function useBalances(tokens: string[], account: string): (BigNumber[] | undefined)[] {
  return useContractCalls(
    tokens.map(token => ({
      abi: ERC20Interface,
      address: token,
      method: "balanceOf",
      args: [account],
    }))
  );
}
