const Cheemscoin = artifacts.require("Cheemscoin");
const Exchange = artifacts.require("Exchange");

module.exports = async deployer => {
  // * These are commented out since truffle is said that everything is up to date
  // * When it's not and Cheemscoin is already deployed
  // await deployer.deploy(Cheemscoin);
  // const cheemscoin = await Cheemscoin.deployed();
  await deployer.deploy(Exchange, "0xEaF7B3376173DF8BC0C22Ad6126943cC8353C1Ee");
};
