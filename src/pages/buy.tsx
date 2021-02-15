import React from "react";
import { Text } from "@chakra-ui/react";

import { fromWei, toWei } from "../utility";
import { newContextComponents } from "@drizzle/react-components";
const { ContractData, ContractForm } = newContextComponents;
// @ts-ignore
import { drizzleReactHooks } from "@drizzle/react-plugin";
const { useDrizzle, useDrizzleState } = drizzleReactHooks;

const Buy: React.FC = () => {
  const { drizzle } = useDrizzle();
  const state = useDrizzleState((state: any) => state);

  // TODO: Replace null with something useful
  return !state.contracts.Exchange.initialized ? null : (
    <>
      <ContractData
        contract="Cheemscoin"
        method="balanceOf"
        drizzle={drizzle}
        drizzleState={state}
        methodArgs={[state.accounts[0]]}
        render={balance => <Text color="orange">Balance: {fromWei(balance)}</Text>}
      />
    </>
  );
};

export default Buy;
