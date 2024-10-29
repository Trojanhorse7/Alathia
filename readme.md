# Alathia Gods - War of the Gods

## Instructions on setting up the Web3 part of the project
0. `cd alathia-web3`
1. `npx hardhat` -> y → typescript → enter → enter
2. `yarn add`
3. Install [Metamask](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en), a browser extension for using Ethereum and other dApps
4. Fund your wallet from the [AIA Faucet](https://aia-faucet-testnet.aiachain.org/)
5. Create a `.env` file and specify a PRIVATE_KEY variable.
6. Add a `METADATA_URI` variable to the `.env` file with a url like `https://example.com/metadata.json`
7. Compile the contract by running the `npx hardhat compile` command
10. Deploy the smart contract on the Fuji test network by running the `npx hardhat run scripts/deploy.ts --network aiaTestnet`