import CheemscoinFarm from "./artifacts/CheemscoinFarm.json";
import { Interface } from "@ethersproject/abi";
export const iFarm = new Interface(CheemscoinFarm.abi);
interface asset {
  name: string;
  exchange: string;
}
export const tokenDetails = (address: string): asset => {
  switch (address) {
    case "0xbd8B3bdce99424a957eFe338ef52d6FDC0Aef417":
      return { name: "CHEEMS - XDAI LP", exchange: "Honeyswap" };
    case "0x898a88e52ff5b96AaD346645c1471Ba8e5625172":
      return { name: "CHEEMS - XDAI LP", exchange: "Sushiswap" };
    case "0x22cF19aFDAf9DF62cDE6367012a31E3Ad6e4E485":
      return { name: "CHEEMS - BNB LP", exchange: "Pancakeswap" };
    default:
      return { name: address, exchange: "Unknown" };
  }
};
// export const tokens = {
//   "0xbd8B3bdce99424a957eFe338ef52d6FDC0Aef417": {
//     name: "CHEEMS - XDAI LP",
//     exchange: "Honeyswap",
//   },
//   "0x898a88e52ff5b96AaD346645c1471Ba8e5625172": {
//     name: "CHEEMS - XDAI LP",
//     exchange: "Sushiswap",
//   },
//   "0x22cF19aFDAf9DF62cDE6367012a31E3Ad6e4E485": {
//     name: "CHEEMS - BNB LP",
//     exchange: "Pancakeswap",
//   },
// };

// * From now, urls should be put here so if they change, it only needs to be modified in code once
export const buyLink = "http://buy.cheemsco.in";
export const honeyswapLink = "http://price.cheemsco.in";
