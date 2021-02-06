/**
 * trufflesuite.com/docs/advanced/configuration
 *
 * To deploy via Infura you'll need a wallet provider (like @truffle/hdwallet-provider)
 * to sign your transactions before they're sent to a remote public node. Infura accounts
 * are available for free at: infura.io/register.
 *
 * You'll also need a mnemonic - the twelve word phrase the wallet uses to generate
 * public/private key pairs. If you're publishing your code to GitHub make sure you load this
 * phrase from a file you've .gitignored so it doesn't accidentally become public.
 *
 */

require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
  contracts_build_directory: "./src/artifacts/",
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
    },
    xdai: {
      provider: function () {
        return new HDWalletProvider(process.env.MNEMONIC, "https://dai.poa.network");
      },
      network_id: 100,
      gas: 500000,
      gasPrice: 1000000000,
    },
  },
  compilers: {
    solc: {
      version: "0.7.4",
    },
  },
};
