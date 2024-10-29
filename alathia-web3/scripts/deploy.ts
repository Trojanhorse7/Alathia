import { ethers } from 'hardhat';
import { config } from 'dotenv';
config();

async function deploy(name: string, ...params: [string | undefined]) {
  const contractFactory = await ethers.getContractFactory(name);
  return await contractFactory.deploy(...params).then((contract: any) => contract.deployed());
}

async function main() {
  const [admin] = await ethers.getSigners();
  const _metadataUri = process.env.METADATA_URI;

  console.log(`Smart contract is being deployed...`);

  const AlathiaGods = (await deploy('AlathiaGods', _metadataUri)).connect(admin);
  console.log(AlathiaGods)

  console.log({ AlathiaGods: AlathiaGods.address });
  console.log(`Smart contract is deployed, Address above.`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  });
