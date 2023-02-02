/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("dotenv").config();
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-ethers");
require("@openzeppelin/hardhat-upgrades");

module.exports = {
  solidity: {
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
    compilers: [
      {
        version: "0.8.17",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  networks: {
    hardhat: {
      chainId: 4, //replaces chainID
      accounts: {
        count: 20,
      },
    },
    // rinkeby: {
    //   url: process.env.ALCHEMY_API_KEY_RINKEBY,
    //   accounts:
    //     process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    //   gas: 2100000,
    //   gasPrice: 8000000000,
    // },
    // matic: {
    //   url: process.env.MATIC_URL || "",
    //   accounts:
    //     process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    //   gas: 2100000,
    //   gasPrice: 8000000000,
    // },
    testnet: {
      url: "https://data-seed-prebsc-1-s2.binance.org:8545",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
      // gas: 9100000,
      // gasPrice: 8000000000,
    },
  },
  etherscan: {
    apiKey: "XQHBN26NNUZIRZVW5CPGHD9Z13PZZHRXKM",
  },
};
