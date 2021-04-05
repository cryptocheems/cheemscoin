import { Drizzle, IDrizzleOptions } from "@drizzle/store";
// @ts-ignore
import { drizzleReactHooks } from "@drizzle/react-plugin";
import { IContract } from "@drizzle/store/types/IContract";

import Cheemscoin from "../artifacts/Cheemscoin.json";
import Exchange from "../artifacts/Exchange.json";

const drizzleOptions: IDrizzleOptions = {
  contracts: [(Cheemscoin as unknown) as IContract, (Exchange as unknown) as IContract],
};

const drizzle = new Drizzle(drizzleOptions);
const { DrizzleProvider } = drizzleReactHooks;

export const DrizzleProv: React.FC = props => {
  return <DrizzleProvider drizzle={drizzle}>{props.children}</DrizzleProvider>;
};
