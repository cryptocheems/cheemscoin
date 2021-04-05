const round = n => Math.round(n / 100) * 100;

module.exports = {
  wei: n => web3.utils.toWei(n, "ether"),
  fromWei: n => web3.utils.fromWei(n),
  round,
  now: () => round(new Date().getTime() / 1000),
};
