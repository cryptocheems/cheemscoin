import web3 from "web3";

export function toWei(n: string) {
  return web3.utils.toWei(n, "ether");
}

export function fromWei(n: string) {
  return web3.utils.fromWei(n);
}
