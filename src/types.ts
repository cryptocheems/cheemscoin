import { BigNumber } from "@ethersproject/bignumber";
import { ReactNode } from "react";

export interface Details {
  poolToken: string;
}

export interface PoolDetails extends Details {
  hsfInDay: BigNumber;
  poolTokenBalance: BigNumber;
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

// The one in useDapp seems broken
export interface Notification {
  type: "transactionStarted" | "transactionSucceed" | "transactionFailed" | "walletConnected";
  id: string;
  transactionName?: string;
  transaction?: { hash: string };
}

export interface notificationDetails {
  title: string;
  description?: ReactNode;
  status: "info" | "warning" | "success" | "error";
}
