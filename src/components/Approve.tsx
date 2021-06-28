import { Button } from "@chakra-ui/react";
import { BigNumber } from "@ethersproject/bignumber";
import { Contract } from "@ethersproject/contracts";
import { ERC20Interface, useContractCall, useContractFunction } from "@usedapp/core";

interface ApproveProps {
  address: string;
  account: string;
  spender: string;
}

const maxUint = BigNumber.from("2").pow(256).sub(1);
const largeUint = BigNumber.from("2").pow(200);

export const Approve: React.FC<ApproveProps> = ({ address, account, spender }) => {
  // @ts-expect-error
  const contract = new Contract(address, ERC20Interface);
  // @ts-expect-error
  const { send: approve } = useContractFunction(contract, "approve");

  // TODO: don't show if already allowed
  const [allowance]: BigNumber[] =
    useContractCall({
      abi: ERC20Interface,
      address,
      method: "allowance",
      args: [account, spender],
    }) ?? [];

  return allowance?.gte(largeUint) ? null : (
    <Button onClick={() => approve(spender, maxUint)} colorScheme="orange" disabled={!allowance}>
      Approve
    </Button>
  );
};
