require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const PRIVATE_KEY = process.env.PRIVATE_KEY

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    bnb: {
      url: "https://opbnb-testnet-rpc.bnbchain.org/",
      accounts: [`0x${PRIVATE_KEY}`],
    },
  }
};
