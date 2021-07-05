import {
  Button,
  useRadioGroup,
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
  FormErrorMessage,
  FormControl,
  NumberInput,
  NumberInputField,
  Text,
  Flex,
  Link,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  useToast,
} from "@chakra-ui/react";
import {
  ChainId,
  useContractCall,
  useContractFunction,
  useEthers,
  useNotifications,
} from "@usedapp/core";
import { ConnectWallet } from "../components/ConnectWallet";
import { Container } from "../components/Container";
import { RadioCard } from "../components/farm/RadioCard";
import { useState } from "react";
import {
  defaultPool,
  farmAddress,
  iFarm,
  tokenDetails,
  farmContract,
  notificationInfo,
  maxLock,
} from "../constants";
import { Approve } from "../components/farm/Approve";
import { useAllowance } from "../hooks/useAllowance";
import { BigNumber, FixedNumber } from "@ethersproject/bignumber";
import { formatEther, parseEther } from "@ethersproject/units";
import { Field, FieldProps, Form, Formik, FormikErrors } from "formik";
import { Asset } from "../components/farm/Asset";
import { TPrice } from "../components/farm/TPrice";
import { DepositDetails, PoolDetails } from "../types";
import { useCheemsPrice } from "../hooks/useCheemsPrice";
import { usePrice } from "../hooks/usePrice";
import { TYield } from "../components/farm/TYield";
import { calcApr, calcMultiplier, now } from "../utils";
import { useBalances } from "../hooks/useBalances";
import { AddXdaiToMetamask } from "../components/AddToMetamask";
import { ExtLink } from "../components/ExtLink";
import { Stats } from "../components/farm/Stats";
import { Expired } from "../components/farm/Expired";
import { DataList } from "../components/farm/DataList";

const largeUint = BigNumber.from("2").pow(200);

const FarmPage: React.FC = () => {
  const { account: accountOrNull } = useEthers();
  const account = accountOrNull ?? "0x000000000000000000000000000000000000dEaD";

  const [pools]: PoolDetails[][] =
    useContractCall({
      abi: iFarm,
      address: farmAddress,
      args: [],
      method: "getAllPools",
    }) ?? [];

  const [accountDeposits]: DepositDetails[][] =
    useContractCall({
      abi: iFarm,
      address: farmAddress,
      args: [account],
      method: "getAccountDeposits",
    }) ?? [];

  const [currentPage, setCurrentPage] = useState("Opportunities");
  const pages =
    !accountDeposits || !accountDeposits[0]
      ? ["Opportunities", "Stats"]
      : ["Opportunities", "My Deposits", "Stats", "Expired Locks"];
  const { getRootProps, getRadioProps } = useRadioGroup({
    defaultValue: "Opportunities",
    onChange: setCurrentPage,
  });
  const group = getRootProps();

  const { isOpen, onClose, onOpen } = useDisclosure();
  const [poolIndexToStake, setPoolIndexToStake] = useState(0);
  const tokenToStake = pools ? pools[poolIndexToStake].poolToken : defaultPool;

  const allowance = useAllowance(tokenToStake, account!, farmAddress);
  const requireApprove = !allowance?.gte(largeUint);
  const lpBalances = useBalances(pools?.map(pool => pool.poolToken) ?? [], account!);
  const currentLpBalance = lpBalances[poolIndexToStake]
    ? formatEther(lpBalances[poolIndexToStake]![0])
    : "0";

  // Idk why these have errors
  // @ts-expect-error
  const { send: deposit } = useContractFunction(farmContract, "createDeposit", {
    transactionName: "Deposit",
  });
  // @ts-expect-error
  const { send: withdraw } = useContractFunction(farmContract, "closeDeposit", {
    transactionName: "Withdrawal",
  });
  // @ts-expect-error
  const { send: harvest } = useContractFunction(farmContract, "withdrawRewards", {
    transactionName: "Harvest",
  });

  function stake(index: number) {
    onOpen();
    setPoolIndexToStake(index);
  }

  const { notifications } = useNotifications();
  const toast = useToast();
  notifications.forEach(n => {
    !toast.isActive(n.id) &&
      toast({
        title: notificationInfo(n).title,
        description: notificationInfo(n).description,
        status: notificationInfo(n).status,
        id: n.id,
        isClosable: true,
        position: "bottom-left",
        duration: n.type === "walletConnected" ? 3000 : 10000,
      });
  });

  return pools ? (
    <>
      <Flex {...group} mb="5" mt="2" flexWrap="wrap" justifyContent="center">
        {pages.map(value => {
          // @ts-expect-error
          const radio = getRadioProps({ value });
          return (
            <RadioCard key={value} {...radio}>
              {value}
            </RadioCard>
          );
        })}
      </Flex>

      {currentPage === "Opportunities" ? (
        <DataList
          headings={["Deposit Asset", "Cheems 24hr", "Yield 24hr", "Yield 1y", ""]}
          items={pools.map((pool, index) => [
            <Asset asset={pool} />,
            FixedNumber.fromValue(pool.hsfInDay, 18).round(2).toString(),
            <TYield pool={pool} days={1} />,
            <TYield pool={pool} days={365} />,
            <Button
              colorScheme="orange"
              onClick={() => stake(index)}
              disabled={!lpBalances[index] || lpBalances[index]![0].isZero()}
            >
              Stake
            </Button>,
          ])}
        />
      ) : currentPage === "My Deposits" ? (
        <DataList
          headings={["Deposit Asset", "Deposit Balance", "Unlock Date", "Unclaimed Cheems", "", ""]}
          items={accountDeposits.map(d => {
            const unlockTime = new Date(d.unlockTime.toNumber() * 1000);

            return [
              <Asset asset={d} />,
              <TPrice
                amount={d.balance}
                priceFn={usePrice}
                priceArgs={[d.poolToken]}
                decimals={7}
              />,
              `${unlockTime.toDateString()}, ${unlockTime.toLocaleTimeString()}`,
              <TPrice amount={d.pendingReward} priceFn={useCheemsPrice} />,
              <Button
                colorScheme="orange"
                onClick={() => withdraw(d.id)}
                disabled={d.unlockTime.toNumber() > now()}
              >
                Withdraw
              </Button>,
              <Button colorScheme="orange" onClick={() => harvest(d.id)}>
                Harvest
              </Button>,
            ];
          })}
        />
      ) : currentPage === "Stats" ? (
        <Stats pools={pools} />
      ) : (
        <Expired />
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
              const adjustment = duration == 2 ? 60 : duration == maxLock ? -20 : 0;
              const endTime = now() + duration * 24 * 60 ** 2 + adjustment;

              deposit(tokenToStake, parseEther(values.amount), endTime);
            }}
            validate={values => {
              const errors: FormikErrors<typeof values> = {};
              const amount = Number(values.amount);
              if (amount <= 0 || values.amount === "-") {
                errors.amount = "Positive amount required";
              } else if (amount > Number(currentLpBalance)) {
                errors.amount = "Insufficient balance";
              }
              if (values.duration === "") errors.duration = "Duration is required";
              return errors;
            }}
          >
            {({ isValid, values, errors, setFieldValue }) => {
              const { apr, baseApr, lockApr } = calcApr(pools[poolIndexToStake], values.duration);
              return (
                <Form>
                  <ModalBody>
                    <Text fontSize="15">
                      Your LP tokens will be locked for the full duration you specify (meaning you
                      cannot withdraw them until the full time has passed)
                    </Text>
                    <Field name="amount">
                      {({ field }: FieldProps) => (
                        <FormControl isInvalid={!!errors.amount} mt="4">
                          <Flex justifyContent="space-between" alignItems="center" mb="1">
                            <FormLabel m="0" htmlFor="amount">
                              Amount
                            </FormLabel>
                            <Link
                              textAlign="right"
                              fontSize="sm"
                              onClick={() => setFieldValue("amount", currentLpBalance)}
                            >
                              Balance: {currentLpBalance}
                            </Link>
                          </Flex>
                          <NumberInput value={values.amount}>
                            <NumberInputField {...field} id="amount" placeholder="0.0" />
                          </NumberInput>
                          <FormErrorMessage>{errors.amount}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="duration">
                      {({ field }: FieldProps) => {
                        const value: string = values.duration;
                        const handleChange = (value: string | number) => {
                          setFieldValue("duration", String(value));
                        };

                        return (
                          <>
                            <Flex justifyContent="space-between" alignItems="center" mb="1" mt="5">
                              <FormLabel htmlFor="duration" mt="4" m="0">
                                Lock Duration (Days)
                              </FormLabel>
                              <Text textAlign="right" fontSize="sm">
                                Multiplier: {calcMultiplier(value)}x
                              </Text>
                            </Flex>

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
                                max={maxLock}
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
                          </>
                        );
                      }}
                    </Field>
                    <Text fontSize="smaller" mt="6">
                      Using the current stats, your deposit will initially have an APR of {lockApr}%
                      for {values.duration} days. After that, it will have an APR of {baseApr}%.
                      Thus, the average APR for 180 days will be {apr}%. All of these APRs are
                      variable (meaning they can change drastically) and depend on a variety of
                      factors. There is no guarantee you will profit in dollar value and it is
                      possible that your LP tokens will lose value. Please read the{" "}
                      {/* TODO: update link to be specific */}
                      <ExtLink plainbg href="https://docs.cheemsco.in/">
                        docs
                      </ExtLink>{" "}
                      before depositing.
                    </Text>
                  </ModalBody>
                  <ModalFooter>
                    {requireApprove && (
                      <Approve address={tokenToStake} spender={farmAddress} disabled={!allowance} />
                    )}
                    <Button
                      colorScheme="orange"
                      disabled={requireApprove || !isValid}
                      ml="3"
                      type="submit"
                    >
                      Deposit
                    </Button>
                  </ModalFooter>
                </Form>
              );
            }}
          </Formik>
        </ModalContent>
      </Modal>
    </>
  ) : (
    <Spinner />
  );
};

const Farm: React.FC = () => {
  const { chainId } = useEthers();

  return (
    <Container>
      <ConnectWallet />
      {/* {chainId === ChainId.Rinkeby ? ( */}
      {chainId === ChainId.xDai ? (
        <FarmPage />
      ) : (
        <>
          <Text mb="5">Unsupported network. Please switch to xDai</Text>
          <AddXdaiToMetamask />
        </>
      )}
    </Container>
  );
};

export default Farm;
