require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const PRIVATE_KEY = process.env.PRIVATE_KEY

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    zkSyncEraSepoliaTestnet: {
      url: "https://mainnet.era.zksync.io",
      accounts: [`1ef03a878f42f3ef7b4b132f72d3666ed71bb3f70defe8ee5c2ffd6874b84b78`],
    },
    zkSyncEraSepoliaMainnet: {
      url: "https://sepolia.era.zksync.dev",
      accounts: [`1ef03a878f42f3ef7b4b132f72d3666ed71bb3f70defe8ee5c2ffd6874b84b78`],
    },
  }
};
