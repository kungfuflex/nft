'use strict';

import hre from 'hardhat';
const mainnetATXDAO = require('../deployments/mainnet/ATXDAONFT_V2');
export default async () => {
  const factory = await hre.ethers.getContractFactory('NFTPinner');
  let nft = await hre.ethers.getContract('ATXDAONFT_V2');
  if (process.env.FORKING) nft = nft.attach(mainnetATXDAO.address);
  const deployment = await hre.upgrades.deployProxy(factory, [ nft.address ]);
  const artifact = await hre.deployments.getArtifact('ATXDAONFT_V2');
  await hre.deployments.save('NFTPinner', {
    address: deployment.address,
    abi: artifact.abi,
    bytecode: artifact.bytecode
  });
};
