import { ERC20Interface, useContractCalls } from "@usedapp/core";

export function useBalances(tokens: string[], account: string) {
  return useContractCalls(
    tokens.map(token => ({
      abi: ERC20Interface,
      address: token,
      method: "balanceOf",
      args: [account],
    }))
  );
}
