'use strict';

import hre from 'hardhat';
export default async () => {
  const factory = await hre.ethers.getContractFactory('NFTPinner');
  const nft = await hre.ethers.getContract('ATXDAONFT_V2');
  const deployment = await hre.upgrades.deployProxy(factory, [ nft.address ]);
  const artifact = await hre.deployments.getArtifact('ATXDAONFT_V2');
  await hre.deployments.save('NFTPinner', {
    address: deployment.address,
    abi: artifact.abi,
    bytecode: artifact.bytecode
  });
};
