const HDWalletProvider = require('@truffle/hdwallet-provider')
const dotenv = require("dotenv").config();

const mnemonics = "";

module.exports = {
  
  networks: {
    development: {
      provider: () => new HDWalletProvider(mnemonics, 'https://goerli.infura.io/v3/c4b28df52267449780256bb10c3a8055'),
        network_id : 5,
        gas : 5500000,
        confirmations : 3,
        timeoutBlocks : 200,
        skipDryRun : true
      },
      rinkeby: {
        provider: () => new HDWalletProvider(mnemonics, 'https://rinkeby.infura.io/v3/e04ee83201cb43d5891835e34d81bd96'),
        network_id : 4,
        gas : 5500000,
        confirmations : 3,
        timeoutBlocks : 200,
        skipDryRun : true
      }    
  },
  compilers: {
    solc: {
      version: "^0.8.0", 
      optimizer: {
        enabled: 'true',
        runs: 200
      }
  },
  }
};
