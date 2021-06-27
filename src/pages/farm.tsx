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
} from "@chakra-ui/react";
import { useContractCall, useContractFunction, useEthers } from "@usedapp/core";
import { Interface } from "@ethersproject/abi";
import { BigNumber } from "@ethersproject/bignumber";
import { Contract } from "@ethersproject/contracts";
import { ConnectWallet } from "../components/ConnectWallet";
import { Container } from "../components/Container";
import { RadioCard } from "../components/RadioCard";
import CheemscoinFarm from "../artifacts/CheemscoinFarm.json";
import { useState } from "react";
import { T2 } from "../components/T2";

const iFarm = new Interface(CheemscoinFarm.abi);
const contractAddress = {
  "4": "0x2A0Bf862A8514F28553b6D5DcB6F4A0EEF6F7968", // Rinkeby
} as const;

// All of this was just to make typecsript happy
type address = keyof typeof contractAddress;
function validateChainId(_id?: string): asserts _id is address {}

interface FarmPageProps {
  chainId: string;
}

const FarmPage: React.FC<FarmPageProps> = ({ chainId }) => {
  validateChainId(chainId);
  // TODO: Use contractAddress[chainId] later
  const farmContract = new Contract("0x2A0Bf862A8514F28553b6D5DcB6F4A0EEF6F7968", iFarm);

  // @ts-expect-error
  const { send: harvest } = useContractFunction(farmContract, "withdrawRewards");

  // * After coding for a while I realised hard coding the pools is probably better
  const [poolLength]: BigNumber[] = useContractCall({
    abi: iFarm,
    address: contractAddress[chainId],
    args: [],
    method: "poolLength",
  }) ?? [BigNumber.from(1)];

  const pools = [];
  for (let i = 0; i < poolLength.toNumber(); i++) {
    const pool =
      useContractCall({
        abi: iFarm,
        address: contractAddress[chainId],
        args: [i],
        method: "getPoolByIndex",
      }) ?? []; // [address, allocation, lastRewardTimestamp, accHsfPerShare, totalShares]
    pools.push(pool);
  }

  const [currentPage, setCurrentPage] = useState("Opportunities");
  const pages = ["Opportunities", "My Deposits"];
  const { getRootProps, getRadioProps } = useRadioGroup({
    defaultValue: "Opportunities",
    onChange: setCurrentPage,
  });
  const group = getRootProps();

  return (
    <Container>
      <ConnectWallet />

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

      {pools[0].map(p => (
        <div key={p.toString()}>{p.toString()}</div>
      ))}

      {currentPage === "Opportunities" ? (
        <Table>
          <Thead>
            <Tr>
              <Th>Asset</Th>
              <Th>APY</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <T2 primary="CHEEMS - XDAI LP" secondary="Honeyswap" />
              <Td>1000%</Td>
              <Td>
                <Button colorScheme="orange">Stake</Button>
              </Td>
            </Tr>
            <Tr>
              <T2 primary="CHEEMS - XDAI LP" secondary="Sushiswap" />
              <Td>500%</Td>
              <Td>
                <Button colorScheme="orange">Stake</Button>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      ) : (
        <Table>
          <Thead>
            <Tr>
              <Th>Deposit Asset</Th>
              <Th>Deposit Balance</Th>
              <Th>Unlock Date</Th>
              <Th>Reward Balance</Th>
              <Th></Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <T2 primary="CHEEMS - XDAI LP" secondary="Honeyswap" />
              {/* TODO: use T2 and show dollar amount as well 
              TODO: Make a Tc element that has less padding*/}
              <Td>0.01</Td>
              <Td>2021-10-11 8:10 AM</Td>
              <Td>23</Td>
              <Td>
                <Button colorScheme="orange">Withdraw</Button>
              </Td>
              <Td>
                {/* TODO: proper errors that user can see */}
                <Button colorScheme="orange" onClick={() => harvest("1")}>
                  Harvest
                </Button>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      )}
    </Container>
  );
};

const Farm: React.FC = () => {
  const { chainId } = useEthers();
  const chainIdString = chainId?.toString() ?? "";

  return chainIdString in contractAddress ? <FarmPage chainId={chainIdString} /> : <Spinner />;
};

export default Farm;
