import { useContractCall, useContractFunction } from "@usedapp/core";
import { farmAddress, farmContract, iFarm } from "../../constants";
import { ExpiredDespoit } from "../../types";
import { Code, Spinner, Text, Table, Thead, Tbody, Tr, Th, Button, Td } from "@chakra-ui/react";
import { Asset } from "./Asset";
import { TPrice } from "./TPrice";
import { usePrice } from "../../hooks/usePrice";

export const Expired: React.FC = ({}) => {
  const [deposits]: ExpiredDespoit[][] =
    useContractCall({
      abi: iFarm,
      address: farmAddress,
      args: [],
      method: "getExpiredDepositIds",
    }) ?? [];

  // @ts-expect-error
  const { send: downgrade } = useContractFunction(farmContract, "downgradeExpired", {
    transactionName: "Claim ",
  });

  if (!deposits) return <Spinner />;

  // From here the elements are just 0
  const notExpiredIndex = deposits.findIndex(d => d.reward.isZero());
  const expiredDeposits = deposits.slice(0, notExpiredIndex);

  return (
    <>
      <Text maxW="50rem" mb="4" mt="1" fontSize="15">
        The smart contract does not know to stop giving the multiplied reward to a deposit once the
        lock has expired unless it is manually told. It's told whenever the deposit is harvested
        from or when the <Code>downgradeExpired()</Code> function is called. To incentivise this,
        whoever does this gets 0.01% of the deposit's LP tokens.
      </Text>
      {!expiredDeposits.length ? (
        <Text fontStyle="oblique" fontSize="xl" mt="10">
          Looks like there aren't any expired locks right now.
        </Text>
      ) : (
        <Table>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Asset</Th>
              <Th>Reward</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {expiredDeposits.map(d => (
              <Tr>
                <Td fontSize="lg">{d.id.toString()}</Td>
                <Asset asset={d} />
                <TPrice
                  amount={d.reward}
                  priceFn={usePrice}
                  priceArgs={[d.poolToken]}
                  decimals={7}
                  dollarDecimals={6}
                />
                <Td>
                  <Button colorScheme="orange" onClick={() => downgrade(d.id)}>
                    Claim
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </>
  );
};
