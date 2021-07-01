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
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import { useContractCall, useContractFunction, useEthers } from "@usedapp/core";
import { ConnectWallet } from "../components/ConnectWallet";
import { Container } from "../components/Container";
import { RadioCard } from "../components/farm/RadioCard";
import { useState } from "react";
import { defaultPool, farmAddress, iFarm, tokenDetails, farmContract } from "../constants";
import { Approve } from "../components/farm/Approve";
import { useAllowance } from "../hooks/useAllowance";
import { BigNumber, FixedNumber } from "@ethersproject/bignumber";
import { useBalance } from "../hooks/useBalance";
import { formatEther, parseEther } from "@ethersproject/units";
import { Field, FieldProps, Form, Formik } from "formik";
import { Asset } from "../components/farm/Asset";
import { TPrice } from "../components/farm/TPrice";
import { DepositDetails, PoolDetails } from "../types";
import { useCheemsPrice } from "../hooks/useCheemsPrice";
import { usePrice } from "../hooks/usePrice";
import { TYield } from "../components/farm/TYield";

const contractAddress = {
  "4": farmAddress, // Rinkeby
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
  // TODO: Maybe useTokenAllowance instead
  const allowance = useAllowance(tokenToStake, account!, contractAddress[chainId]);
  const requireApprove = !allowance?.gte(largeUint);
  // TODO: Maybe useTokenBalance instead
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
      <HStack {...group} mb="5">
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

      {/* TODO: Make Stats for Nerds toggle that shows other stats */}
      {currentPage === "Opportunities" ? (
        <Table>
          <Thead>
            <Tr>
              <Th>Deposit Asset</Th>
              <Th>Cheems 24hr</Th>
              <Th>Yield 24hr</Th>
              <Th>Yield 1y</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {pools &&
              pools.map(pool => (
                <Tr key={pool.poolToken}>
                  <Asset asset={pool} />
                  <Td>{FixedNumber.fromValue(pool.hsfInDay, 18).round(2).toString()}</Td>
                  <TYield pool={pool} days={1} />
                  <TYield pool={pool} days={365} />
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
                    <TPrice
                      amount={d.balance}
                      priceFn={usePrice}
                      priceArgs={[d.poolToken]}
                      decimals={6}
                    />
                    <Td>{unlockTime.toLocaleString()}</Td>
                    <TPrice amount={d.pendingReward} priceFn={useCheemsPrice} />
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
            initialValues={{ amount: "0", duration: "2" }}
            onSubmit={values => {
              const duration = Number(values.duration);
              // So Metamask doesn't freak out
              const adjustment = duration == 2 ? 60 : duration == 180 ? -20 : 0;
              const now = Math.floor(new Date().valueOf() / 1000);
              const endTime = now + duration * 24 * 60 ** 2 + adjustment;

              deposit(tokenToStake, parseEther(values.amount), endTime);
            }}
          >
            {() => (
              <Form>
                <ModalBody>
                  <Text fontSize="sm">
                    Your LP tokens will be locked for the full duration you specify (meaning you
                    cannot withdraw them)
                  </Text>
                  <Field name="amount">
                    {({ field }: FieldProps) => (
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
                      </NumberInput>
                    )}
                  </Field>
                  <FormLabel htmlFor="duration" mt="4" mb="1">
                    Lock Duration (Days)
                  </FormLabel>
                  <Field name="duration">
                    {({ field, form }: FieldProps) => {
                      const value = form.values.duration;
                      const handleChange = (value: string | number) => {
                        form.setFieldValue("duration", String(value));
                      };

                      return (
                        <Flex>
                          <NumberInput
                            maxW="3.8rem"
                            mr="1rem"
                            value={value}
                            onChange={handleChange}
                            min={2}
                            max={180}
                          >
                            <NumberInputField {...field} id="duration" pr="3" placeholder="2" />
                          </NumberInput>
                          <Slider
                            colorScheme="green"
                            min={2}
                            max={180}
                            defaultValue={2}
                            value={Number(value)}
                            focusThumbOnChange={false}
                            onChange={handleChange}
                          >
                            <SliderTrack>
                              <SliderFilledTrack />
                            </SliderTrack>
                            <SliderThumb />
                          </Slider>
                        </Flex>
                      );
                    }}
                  </Field>
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
