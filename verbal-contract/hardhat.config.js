require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    bnb: {
      url: "https://opbnb-testnet-rpc.bnbchain.org/",
      accounts: [
        `57db7429988671e07cf74ec1655b9b5b58fff6e1bb579efcc2cf6e4c29fdcdf6`,
      ],
    },
  },
};
