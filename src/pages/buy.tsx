import React, { useRef } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  FormHelperText,
  FormLabel,
  Image,
  NumberInput,
  NumberInputField,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Formik, Form, Field, FormikValues } from "formik";

import { fromWei, toWei } from "../utility";
import { newContextComponents } from "@drizzle/react-components";
const { ContractData, ContractForm } = newContextComponents;
// @ts-ignore
import { drizzleReactHooks } from "@drizzle/react-plugin";
import { ArrowDownIcon } from "@chakra-ui/icons";
const { useDrizzle, useDrizzleState } = drizzleReactHooks;
import { DrizzleProv } from "../components/DrizzleProv";

const BuyPage: React.FC = () => {
  const { drizzle } = useDrizzle();
  const state = useDrizzleState((state: any) => state);
  const account = state.accounts[0];

  // TODO: Round numbers
  const priceRef = useRef<HTMLSpanElement>(null);
  const contractBalRef = useRef<HTMLDivElement>(null);

  return !state.contracts.Exchange.initialized ? (
    <Box m="6" h="100%">
      <Text>
        To use the exchange, ensure you have xDAI selected as the current network on Metamask.
      </Text>
      <Text>Then refresh the page and connect Metamask.</Text>
    </Box>
  ) : (
    <Container mt="10" h="100%">
      <Text right="0" position="relative" textAlign="right" color="orange">
        {account}
      </Text>

      <ContractForm
        contract="Exchange"
        method="buy"
        drizzle={drizzle}
        drizzleState={state}
        render={() => (
          <Container borderWidth="1px" p="7" borderRadius="xl" my="3">
            <Formik
              initialValues={{ xDaiAmount: "" }}
              isInitialValid={false}
              validate={({ xDaiAmount }) => {
                const xDaiInput = Number(xDaiAmount);
                const xDaiBal = Number(fromWei(state.accountBalances[account]));

                if (xDaiInput <= 0 || isNaN(xDaiInput)) {
                  return { xDaiAmount: "Amount must be positive" };
                } else if (xDaiInput > xDaiBal) {
                  return { xDaiAmount: "Amount must be less than balance" };
                }
                // TODO: Throw error if cheems exceeds contract bal
              }}
              onSubmit={async ({ xDaiAmount }) => {
                // TODO: Show transaction hashes
                drizzle.contracts.Exchange.methods.buy.cacheSend({ value: toWei(xDaiAmount) });
              }}
            >
              {({ isValid }) => (
                <Form>
                  <Field name="xDaiAmount">
                    {({ field }: FormikValues) => (
                      <Stack spacing="3">
                        <NumberInput
                          min={0.00000001}
                          max={Number(fromWei(state.accountBalances[account]))}
                        >
                          <FormLabel alignItems="center" display="flex">
                            <Image src="xdai.png" h="7" display="inline" mr="2" />
                            xDAI
                          </FormLabel>
                          <NumberInputField {...field} placeholder="0.00" />
                          <FormHelperText>
                            Balance: {fromWei(state.accountBalances[account])}
                          </FormHelperText>
                        </NumberInput>

                        <ArrowDownIcon color="green" />

                        <NumberInput
                          min={0.000000001}
                          value={Number(field.value) / Number(priceRef.current?.textContent) || ""}
                        >
                          <FormLabel alignItems="center" display="flex">
                            <Image src="cheemscoinSmall.png" h="7" display="inline" mr="2" />
                            CHEEMS
                          </FormLabel>
                          <NumberInputField placeholder="0.00" />
                          <ContractData
                            contract="Cheemscoin"
                            method="balanceOf"
                            drizzle={drizzle}
                            drizzleState={state}
                            methodArgs={[account]}
                            render={balance => (
                              <FormHelperText>Balance: {fromWei(balance)}</FormHelperText>
                            )}
                          />
                        </NumberInput>
                      </Stack>
                    )}
                  </Field>
                  <Button type="submit" colorScheme="green" w="100%" mt="10" isDisabled={!isValid}>
                    Buy
                  </Button>
                </Form>
              )}
            </Formik>
            <ContractData
              contract="Exchange"
              method="price"
              drizzle={drizzle}
              drizzleState={state}
              render={value => (
                <Flex mt="3" fontSize="0.8em" color="gray.500" justifyContent="space-between">
                  <div>
                    <Text>
                      <span ref={priceRef}>{fromWei(value)}</span> xDAI per CHEEMS
                    </Text>
                    <Text>{Number(fromWei(value)) ** -1} CHEEMS per xDAI</Text>
                  </div>

                  <ContractData
                    contract="Cheemscoin"
                    method="balanceOf"
                    drizzle={drizzle}
                    drizzleState={state}
                    methodArgs={[drizzle.contracts.Exchange.address]}
                    render={balance => {
                      return (
                        <Box textAlign="right">
                          <Text>Contract Balance: </Text>
                          <Text ref={contractBalRef}>{fromWei(balance)}</Text>
                        </Box>
                      );
                    }}
                  />
                </Flex>
              )}
            />
          </Container>
        )}
      />

      <Text textAlign="center" fontSize="sm">
        Note: You will have to refresh the page to see any changes in balances and/or price
      </Text>
    </Container>
  );
};

// * I did this so I can use useDapp for other pages and continue to use Drizzle for this
const Buy: React.FC = () => (
  <DrizzleProv>
    <BuyPage />
  </DrizzleProv>
);
export default Buy;
