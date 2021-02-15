module.exports = {
  wei: n => {
    return web3.utils.toWei(n, "ether");
  },
  fromWei: n => {
    return web3.utils.fromWei(n);
  },
};
