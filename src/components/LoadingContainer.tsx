import React from "react";
// @ts-ignore
import { drizzleReactHooks } from "@drizzle/react-plugin";
import { Hero } from "./Hero";

const { useDrizzleState } = drizzleReactHooks;

interface LoadingContainerProps {
  children: React.ReactNode;
}

export const LoadingContainer: React.FC<LoadingContainerProps> = ({ children }) => {
  const drizzleState = useDrizzleState((state: any) => state);

  if (!drizzleState.drizzleStatus.initialized) {
    // TODO: say that you need metamask
    return <Hero title="loading..." />;
  } else if (drizzleState.web3.status === "failed") {
    return <Hero title="Refresh and connect with metamask" />;
  } else {
    return <>{children}</>;
  }
};
