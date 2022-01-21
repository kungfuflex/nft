import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-etherscan';
import '@nomiclabs/hardhat-waffle';
import '@typechain/hardhat';
import dotenv from 'dotenv';
import fs from 'fs';
import { HardhatUserConfig } from 'hardhat/config';
import 'hardhat-deploy';
import 'hardhat-deploy-ethers';
import '@openzeppelin/hardhat-upgrades';

dotenv.config();

if (fs.existsSync('typechain-types')) {
  require('./scripts/deploy');
  require('./scripts/get-nft-owners');
  require('./scripts/merkle-tree');
  require('./scripts/nft-v2');
}

const { MAINNET_RPC_URL, ROPSTEN_RPC_URL, PRIVATE_KEY, ETHERSCAN_API_KEY } =
  process.env;
const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.9',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  paths: {
    sources: 'contracts/',
  },
  networks: {
    hardhat: process.env.FORKING ? {
      forking: {
        enabled: true,
	url: 'https://mainnet.infura.io/v3/816df2901a454b18b7df259e61f92cd2'
      },
      chainId: 1
    } : {},
    local: {
      // hardhat network id from `hh node`
      chainId: 31337,
      url: 'http://127.0.0.1:8545',
    },
    ropsten: {
      url: ROPSTEN_RPC_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    mainnet: {
      url: MAINNET_RPC_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },

  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: ETHERSCAN_API_KEY,
  },
};

// eslint-disable-next-line import/no-default-export
export default config;
