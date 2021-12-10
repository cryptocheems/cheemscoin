import CheemscoinFarm from "./artifacts/CheemscoinFarm.json";
import { Interface } from "@ethersproject/abi";
import { LPDetails, Notification, notificationDetails } from "./types";
import { Contract } from "@usedapp/core/node_modules/@ethersproject/contracts";
import { TxHash } from "./components/TxHash";
import { FixedNumber } from "@ethersproject/bignumber";

export const cheemsAddress = "0xeaf7b3376173df8bc0c22ad6126943cc8353c1ee";
export const farmAddress = "0x8E9Bba528f4B689dd1B8747875a69D4280Aa33e9";
export const iFarm = new Interface(CheemscoinFarm.abi);
export const farmContract = new Contract(farmAddress, iFarm);
export const defaultPool = "0xce5382ff31b7a6F24797A46c307351FDE135C0Fd";
export const totalCheems = FixedNumber.from("345210");
export const maxLock = 30;

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
    default:
      return { name: address, exchange: "", url: "" };
  }
};

export const graphUrl = (address: string) => {
  switch (address.toLowerCase()) {
    case "0x972dec20648f57a350d8fe09acd22805fe246c84":
      return "https://api.thegraph.com/subgraphs/name/luzzif/swapr-xdai";
    default:
      return "https://api.thegraph.com/subgraphs/name/1hive/honeyswap-xdai";
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
