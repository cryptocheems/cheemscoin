import CheemscoinFarm from "./artifacts/CheemscoinFarm.json";
import { Interface } from "@ethersproject/abi";
import { LPDetails, Notification, notificationDetails } from "./types";
import { Contract } from "@ethersproject/contracts";
import { TxHash } from "./components/TxHash";
import { FixedNumber } from "@ethersproject/bignumber";

// TODO: Make this right
// export const cheemsAddress = "0x060153c56952571389507aa373fc39343607373f";
export const cheemsAddress = "0xeaf7b3376173df8bc0c22ad6126943cc8353c1ee";
// export const farmAddress = "0x155A65C64C80A5Bd6a294403eb22dEc2226B51E8";
export const farmAddress = "0xa67053D86b1bF52fd8391384c9dfC23EC6D9d1fd";
export const iFarm = new Interface(CheemscoinFarm.abi);
export const farmContract = new Contract(farmAddress, iFarm);
// export const defaultPool = "0xbd8B3bdce99424a957eFe338ef52d6FDC0Aef417";
export const defaultPool = "0xce5382ff31b7a6F24797A46c307351FDE135C0Fd";
export const totalCheems = FixedNumber.from("140");
export const maxLock = 7;

export const tokenDetails = (address: string): LPDetails => {
  switch (address) {
    case defaultPool:
      return {
        name: "CHEEMS - XDAI LP",
        exchange: "Honeyswap",
        url: "https://app.honeyswap.org/#/add/0xe91d153e0b41518a2ce8dd3d7944fa863463a97d/0xeaf7b3376173df8bc0c22ad6126943cc8353c1ee?chainId=100",
      };
    case "0xCA9d54300BbC19878d8c9601bBa1821d44dF26e9":
    case "0x898a88e52ff5b96AaD346645c1471Ba8e5625172":
      return {
        name: "CHEEMS - HNY LP",
        exchange: "Honeyswap",
        url: "https://app.honeyswap.org/#/add/0x71850b7e9ee3f13ab46d67167341e4bdc905eef9/0xeaf7b3376173df8bc0c22ad6126943cc8353c1ee?chainId=100",
      };
    case "0xE60976a1456d589507cFC11a86f6B8be15Fc799c":
    case "0x22cF19aFDAf9DF62cDE6367012a31E3Ad6e4E485":
      return {
        name: "CHEEMS - WBTC LP",
        exchange: "Honeyswap",
        url: "https://app.honeyswap.org/#/add/0x8e5bbbb09ed1ebde8674cda39a0c169401db4252/0xeaf7b3376173df8bc0c22ad6126943cc8353c1ee?chainId=100",
      };
    case "0x972dec20648f57a350d8fe09ACD22805FE246c84":
      return {
        name: "CHEEMS - WETH LP",
        exchange: "Swapr",
        url: "https://swapr.eth.link/#/add/0x6a023ccd1ff6f2045c3309768ead9e68f978f6e1/0xeaf7b3376173df8bc0c22ad6126943cc8353c1ee?chainId=100",
      };
    case "0x58D86fA82be09B3456d931fd8CD3Babcd4118C4B":
      return {
        name: "CHEEMS - BNB LP",
        exchange: "PancakeSwap",
        // TODO: Change to url of tutorial
        url: "https://exchange.pancakeswap.finance/#/add/0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c/0xf2d86f9198a8373ad433496fcb2951248db1c79d",
      };
    default:
      return { name: address, exchange: "", url: "" };
  }
};

export const graphDetails = (address: string) => {
  switch (address.toLowerCase()) {
    case "0x972dec20648f57a350d8fe09acd22805fe246c84":
      return { address, url: "https://api.thegraph.com/subgraphs/name/luzzif/swapr-xdai" };
    case "0x58d86fa82be09b3456d931fd8cd3babcd4118c4b":
      return {
        address: "0x80d34220522E129230354B6B5679Ae9F2349d4b0",
        // TODO: Find subraph that works
        url: "https://api.thegraph.com/subgraphs/name/1hive/honeyswap-xdai",
      };
    default:
      return { address, url: "https://api.thegraph.com/subgraphs/name/1hive/honeyswap-xdai" };
  }
};

export const notificationInfo = (notification: Notification): notificationDetails => {
  switch (notification.type) {
    case "walletConnected":
      return { status: "success", title: "Wallet Connected" };
    case "transactionStarted":
      return {
        status: "info",
        title: notification.transactionName + " Pending",
        description: TxHash({ notification }),
      };
    case "transactionSucceed":
      return {
        status: "success",
        title: notification.transactionName + " Successful",
        description: TxHash({ notification }),
      };
    case "transactionFailed":
      return { status: "error", title: notification.transactionName + " Failed" };
    default:
      return { status: "error", title: "Unknown error" };
  }
};

// * From now, urls should be put here so if they change, it only needs to be modified in code once
export const buyLink = "http://buy.cheemsco.in";
export const honeyswapLink = "http://price.cheemsco.in";
