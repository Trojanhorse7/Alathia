import dotenv from 'dotenv';
import '@nomiclabs/hardhat-ethers';

dotenv.config();

export default {
  solidity: {
    version: '0.8.16',
    settings: {
      viaIR: true,
      optimizer: {
        enabled: true,
        runs: 100,
      },
    },
  },
  networks: {
    aiaTestnet: {
      url: 'https://aia-dataseed1-testnet.aiachain.org', // RPC URL for AIA testnet
      chainId: 1320, // Chain ID for AIA testnet
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
