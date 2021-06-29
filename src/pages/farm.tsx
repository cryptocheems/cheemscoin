import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  useRadioGroup,
  HStack,
  Spinner,
  Modal,
  ModalContent,
  useDisclosure,
  ModalOverlay,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  FormLabel,
  NumberInput,
  NumberInputField,
  Text,
  Flex,
  Link,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useContractCall, useContractFunction, useEthers } from "@usedapp/core";
import { Contract } from "@ethersproject/contracts";
import { ConnectWallet } from "../components/ConnectWallet";
import { Container } from "../components/Container";
import { RadioCard } from "../components/farm/RadioCard";
import { useState } from "react";
import { defaultPool, iFarm, tokenDetails } from "../constants";
import { Approve } from "../components/farm/Approve";
import { useAllowance } from "../hooks/useAllowance";
import { BigNumber } from "@ethersproject/bignumber";
import { useBalance } from "../hooks/useBalance";
import { formatEther, parseEther } from "@ethersproject/units";
import { Field, Form, Formik } from "formik";
import { Asset } from "../components/farm/Asset";
import { DepositDetails, PoolDetails } from "../types";

const contractAddress = {
  "4": "0xB2505eb72706434070324802b67AE65d4601F7a5", // Rinkeby
} as const;

const largeUint = BigNumber.from("2").pow(200);

// All of this was just to make typecsript happy
type address = keyof typeof contractAddress;
function validateChainId(_id?: string): asserts _id is address {}

interface FarmPageProps {
  chainId: string;
}

const FarmPage: React.FC<FarmPageProps> = ({ chainId }) => {
  const { account } = useEthers();

  validateChainId(chainId);
  // TODO: Use contractAddress[chainId] later
  const farmContract = new Contract("0xB2505eb72706434070324802b67AE65d4601F7a5", iFarm);

  const [pools]: PoolDetails[][] =
    useContractCall({
      abi: iFarm,
      address: contractAddress[chainId],
      args: [],
      method: "getAllPools",
    }) ?? [];

  const [accountDeposits]: DepositDetails[][] =
    useContractCall({
      abi: iFarm,
      address: contractAddress[chainId],
      args: [account],
      method: "getAccountDeposits",
    }) ?? [];

  const [currentPage, setCurrentPage] = useState("Opportunities");
  const pages = ["Opportunities", "My Deposits"];
  const { getRootProps, getRadioProps } = useRadioGroup({
    defaultValue: "Opportunities",
    onChange: setCurrentPage,
  });
  const group = getRootProps();

  const { isOpen, onClose, onOpen } = useDisclosure();
  const [tokenToStake, setTokenToStake] = useState(defaultPool);
  const allowance = useAllowance(tokenToStake, account!, contractAddress[chainId]);
  const requireApprove = !allowance?.gte(largeUint);
  // TODO: Make a useBalances to get all of the LP balances at once
  const lpBalance = useBalance(tokenToStake, account!);

  // Idk why these have errors
  // @ts-expect-error
  const { send: deposit } = useContractFunction(farmContract, "createDeposit");
  // @ts-expect-error
  const { send: withdraw } = useContractFunction(farmContract, "closeDeposit");
  // @ts-expect-error
  const { send: harvest } = useContractFunction(farmContract, "withdrawRewards");

  function stake(token: string) {
    onOpen();
    setTokenToStake(token);
  }

  return (
    <>
      <HStack {...group}>
        {pages.map(value => {
          // @ts-expect-error
          const radio = getRadioProps({ value });
          return (
            <RadioCard key={value} {...radio}>
              {value}
            </RadioCard>
          );
        })}
      </HStack>

      {/* {pools && pools.map((pool: any[]) => <div key={pool[0]}>{pool.join(", ")}</div>)} */}
      {/* TODO: Make Stats for Nerds toggle that shows other stats */}
      {currentPage === "Opportunities" ? (
        <Table>
          <Thead>
            <Tr>
              <Th>Deposit Asset</Th>
              <Th>APY</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {pools &&
              pools.map(pool => (
                <Tr key={pool.poolToken}>
                  <Asset asset={pool} />
                  <Td>XXX%</Td>
                  <Td>
                    {/* TODO: Disable if no balance */}
                    <Button colorScheme="orange" onClick={() => stake(pool.poolToken)}>
                      Stake
                    </Button>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      ) : (
        <Table>
          <Thead>
            <Tr>
              <Th>Deposit Asset</Th>
              <Th>Deposit Balance</Th>
              <Th>Unlock Date</Th>
              <Th>Unclaimed Cheems</Th>
              <Th></Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {accountDeposits &&
              accountDeposits.map((d, i) => {
                const unlockTime = new Date(d.unlockTime.toNumber() * 1000);

                return (
                  <Tr key={i}>
                    <Asset asset={d} />
                    {/* TODO: use T2 and show dollar amount as well 
              TODO: Make a Tc element that has less padding*/}
                    <Td>{formatEther(d.balance)}</Td>
                    <Td>{unlockTime.toLocaleString()}</Td>
                    <Td>{formatEther(d.pendingReward)}</Td>
                    <Td>
                      <Button
                        colorScheme="orange"
                        onClick={() => withdraw(d.id)}
                        disabled={unlockTime.valueOf() > new Date().valueOf()}
                      >
                        Withdraw
                      </Button>
                    </Td>
                    <Td>
                      {/* TODO: proper errors that user can see */}
                      <Button colorScheme="orange" onClick={() => harvest(d.id)}>
                        Harvest
                      </Button>
                    </Td>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Deposit {tokenDetails(tokenToStake).name}</ModalHeader>
          <ModalCloseButton />
          <Formik
            initialValues={{ amount: "0" }}
            onSubmit={values => {
              deposit(
                tokenToStake,
                parseEther(values.amount),
                // TODO: Make this not hardcoded
                Math.round(new Date().valueOf() / 1000) + 49 * 60 ** 2
              );
            }}
          >
            {() => (
              <Form>
                <ModalBody>
                  <Text fontSize="sm">
                    Your LP tokens will be locked for the full duration you specify (meaning you
                    cannot withdraw them)
                  </Text>
                  <Field>
                    {/* @ts-expect-error */}
                    {({ field, form }) => (
                      <NumberInput mt="6">
                        <Flex justifyContent="space-between" alignItems="center" mb="1">
                          <FormLabel m="0" htmlFor="amount">
                            Amount
                          </FormLabel>
                          {/* TODO: Make this change value to balance */}
                          <Link textAlign="right" fontSize="sm">
                            Balance: {formatEther(lpBalance)}
                          </Link>
                        </Flex>
                        <NumberInputField {...field} id="amount" placeholder="0.0" />
                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                      </NumberInput>
                    )}
                  </Field>

                  {/* TODO: Numbers of days locked */}
                </ModalBody>
                <ModalFooter>
                  {requireApprove && (
                    <Approve
                      address={tokenToStake}
                      spender={contractAddress[chainId]}
                      disabled={!allowance}
                    />
                  )}
                  <Button colorScheme="orange" disabled={requireApprove} ml="3" type="submit">
                    Deposit
                  </Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </>
  );
};

const Farm: React.FC = () => {
  const { chainId } = useEthers();
  const chainIdString = chainId?.toString() ?? "";

  return (
    <Container>
      <ConnectWallet />
      {chainIdString in contractAddress ? <FarmPage chainId={chainIdString} /> : <Spinner />}
    </Container>
  );
};

export default Farm;
