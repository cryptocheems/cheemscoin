const TokenLock = artifacts.require("TokenLock");

module.exports = async deployer => await deployer.deploy(TokenLock);
