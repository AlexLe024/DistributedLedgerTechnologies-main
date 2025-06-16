import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const deploySimpleNFT: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  await deploy("SimpleNFT", {
    from: deployer,
    log: true,
  });
};

export default deploySimpleNFT;
deploySimpleNFT.tags = ["SimpleNFT"];