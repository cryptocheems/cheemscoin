import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  NumberInput,
  NumberInputField,
  Text,
} from "@chakra-ui/react";
import React, { ChangeEvent, FormEvent } from "react";

import { version } from "../../package.json";
import { fromWei, toWei } from "../utility";
import { newContextComponents } from "@drizzle/react-components";
// @ts-ignore
import { drizzleReactHooks } from "@drizzle/react-plugin";
import { DrizzleProv } from "../components/DrizzleProv";
const { useDrizzle, useDrizzleState } = drizzleReactHooks;
const { ContractData, ContractForm } = newContextComponents;

const DevPage: React.FC = () => {
  const { drizzle } = useDrizzle();
  const state = useDrizzleState((state: any) => state);

  function handleSubmit(event: FormEvent<HTMLFormElement>, s: any) {
    event.preventDefault();

    drizzle.contracts.Exchange.methods.setPrice.cacheSend(toWei(s._newPrice));
  }

  return (
    <>
      <Heading mt="5">For dev use only</Heading>
      <Text>Trying to use this will not work</Text>
      {!state.contracts.Exchange.initialized ? null : (
        <>
          <ContractData
            contract="Exchange"
            method="price"
            drizzle={drizzle}
            drizzleState={state}
            render={value => <Text color="orange">{fromWei(value)} xDai per CHEEMS</Text>}
          />
          <ContractForm
            contract="Exchange"
            method="setPrice"
            drizzle={drizzle}
            drizzleState={state}
            render={({ handleInputChange, inputs: [input], state }) => (
              <form onSubmit={e => handleSubmit(e, state)}>
                <FormControl isRequired mt="5">
                  <FormLabel>New Price</FormLabel>
                  <NumberInput min={0.0001}>
                    <NumberInputField
                      name={input.name}
                      onChange={handleInputChange as (event: ChangeEvent<HTMLInputElement>) => void}
                    />
                  </NumberInput>
                  <FormHelperText>Minimum is 0.0001</FormHelperText>
                  <Button colorScheme="green" mt="3" type="submit">
                    Set Price
                  </Button>
                </FormControl>
              </form>
            )}
          />
        </>
      )}

      <pre style={{ fontSize: "11px" }}>{JSON.stringify(state, undefined, 3)}</pre>

      <Text>Version {version}</Text>
    </>
  );
};

const Dev: React.FC = () => (
  <DrizzleProv>
    <DevPage />
  </DrizzleProv>
);

export default Dev;
