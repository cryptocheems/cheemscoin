const Cheemscoin = artifacts.require("Cheemscoin");
const Exchange = artifacts.require("Exchange");

module.exports = async deployer => {
  await deployer.deploy(Cheemscoin);
  const cheemscoin = await Cheemscoin.deployed();
  await deployer.deploy(Exchange, cheemscoin.address);
};
