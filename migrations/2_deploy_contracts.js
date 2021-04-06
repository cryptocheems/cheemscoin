const Cheemscoin = artifacts.require("Cheemscoin");
const Exchange = artifacts.require("Exchange");
const Fah = artifacts.require("Fah");

module.exports = async deployer => {
  // I just learnt you're meant to create a new migration file for each set of contracts
  await deployer.deploy(Cheemscoin, { overwrite: false });
  const cheemscoin = await Cheemscoin.deployed();

  await deployer.deploy(Exchange, cheemscoin.address, { overwrite: false });
  await deployer.deploy(Fah, cheemscoin.address, { overwrite: false });
};
