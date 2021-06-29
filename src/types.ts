import { BigNumber } from "@ethersproject/bignumber";

export interface Details {
  poolToken: string;
}

export interface PoolDetails extends Details {
  allocation: BigNumber;
  lastRewardTimestamp: BigNumber;
  accHsfPerShare: BigNumber;
  totalShares: BigNumber;
}

export interface DepositDetails extends Details {
  balance: BigNumber;
  unlockTime: BigNumber;
  pendingReward: BigNumber;
  id: BigNumber;
}

// Used in tokenDetails()
export interface LPDetails {
  name: string;
  exchange: string;
  url: string; // Link to add liquidity
}
