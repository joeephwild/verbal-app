require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const PRIVATE_KEY = process.env.PRIVATE_KEY

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    alfajores: {
      url: "https://alfajores-forno.celo-testnet.org/",
      accounts: [`1ef03a878f42f3ef7b4b132f72d3666ed71bb3f70defe8ee5c2ffd6874b84b78`],
    },
  }
};
