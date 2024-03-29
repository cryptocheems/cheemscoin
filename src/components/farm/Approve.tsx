import { Button } from "@chakra-ui/react";
import { BigNumber } from "@ethersproject/bignumber";
import { Contract } from "@usedapp/core/node_modules/@ethersproject/contracts";
import { ERC20Interface, useContractFunction } from "@usedapp/core";

interface ApproveProps {
  address: string;
  spender: string;
  disabled: boolean;
}

const maxUint = BigNumber.from("2").pow(256).sub(1);

export const Approve: React.FC<ApproveProps> = ({ address, spender, disabled }) => {
  const contract = new Contract(address, ERC20Interface);
  const { send: approve } = useContractFunction(contract, "approve", {
    transactionName: "Approval",
  });

  return (
    <Button onClick={() => approve(spender, maxUint)} colorScheme="orange" disabled={disabled}>
      Approve
    </Button>
  );
};
