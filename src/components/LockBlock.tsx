import { Stat, StatHelpText, StatLabel, StatNumber, Link } from "@chakra-ui/react";
import { BigNumberish } from "@ethersproject/bignumber";
import { formatEther } from "@ethersproject/units";

// TODO: Make these xDai accurate and do LP Tokens
const tokenNames: { [key: string]: string | undefined } = {
  "0x060153C56952571389507AA373FC39343607373f": "Cheemscoin",
  "0xce5382ff31b7a6F24797A46c307351FDE135C0Fd": "Cheemscoin LP Token",
};

export type iLock = [string, BigNumberish, BigNumberish, string | undefined];

interface LockBlockProps {
  type: "Requestable" | "Unlockable";
  lock: iLock;
}

export const LockBlock: React.FC<LockBlockProps> = ({ lock, type }) =>
  !(formatEther(lock[2]) === "0.0") ? (
    <Stat
      borderWidth="thin"
      p="1em"
      borderRadius="2xl"
      mx="1"
      backgroundColor={lock[3] ? "rgba(255, 20, 0, 0.2)" : undefined}
    >
      <StatLabel>
        <Link href={"https://blockscout.com/xdai/mainnet/tokens/" + lock[0]} isExternal>
          {tokenNames[lock[0]] ?? lock[0]}
        </Link>
      </StatLabel>
      <StatNumber>{formatEther(lock[1])}</StatNumber>
      <StatHelpText>
        {type} from {new Date(Number(lock[2].toString()) * 1000).toLocaleDateString()}{" "}
        {lock[3] ? "to " + lock[3] : null}
      </StatHelpText>
    </Stat>
  ) : null;
