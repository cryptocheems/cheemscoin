const Cheemscoin = artifacts.require("Cheemscoin");

module.exports = function (deployer) {
  deployer.deploy(Cheemscoin);
};
