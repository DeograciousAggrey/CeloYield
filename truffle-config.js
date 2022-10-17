require('babel-register');
require('babel-polyfill');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
const mnemonic = fs
  .readFileSync('.secret')
  .toString()
  .trim();
const infuraKey = fs
  .readFileSync('.infuraKey')
  .toString()
  .trim();
const ethKey = fs
  .readFileSync('.ethKey')
  .toString()
  .trim();
const ContractKit = require('@celo/contractkit');
const Web3 = require('web3');
const { Alfajores } = require('@celo-tools/use-contractkit');

require('dotenv').config({path: '.env'});


/*

// Create connection to DataHub Celo Network node
const web3 = new Web3(process.env.REST_URL);

const client = ContractKit.newKitFromWeb3(web3);

//Initialize account from our private key
const account = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY);

//Add private key to ContractKit in order to sign transactions
client.addAccount(account.privateKey);

module.exports = {
  compilers: {
    solc: {
      version: "0.6.6",    // Fetch exact version from solc-bin (default: truffle's version)
    }
  },
  networks: {
    test: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    alfajores: {
      provider: client.connection.web3.currentProvider, // CeloProvider
      network_id: 44787  // latest Alfajores network id
    }
  }
};





*/








module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '*', // Match any network id
    },

    //ROPSTEN Test net
    ropsten: {
      provider: function() {
        return new HDWalletProvider(
          mnemonic,
          `https://ropsten.infura.io/v3/${infuraKey}`
        );
      },
      network_id: 3,
      gas: 4500000,
      gasPrice: 10000000000,
    },
    testnet: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://alfajores-forno.celo-testnet.org")
      },
      network_id: 44787,
      gas: 20000000
    },


    //RINKEBY Test net
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(
          mnemonic,
          `https://rinkeby.infura.io/v3/${infuraKey}`
        );
      },
      network_id: 4,
      gas: 4500000,
      gasPrice: 10000000000,
    },
  },

  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      evmVersion: 'petersburg',
    },
  },

  //etherscan API key
  
  
  



 /* api_keys: {
    etherscan: ethKey,
  },
  */
  // plugin for verification
 // plugins: ['truffle-plugin-verify'],

};

//truffle test

// call console - truffle console
// get contract - await TestToken.deployed()

// to compile - truffle compile
// to deploy - truffle migrate --reset
// to deploy - truffle migrate --network rinkeby --reset
// to verify - truffle run verify Contract --network rinkeby
