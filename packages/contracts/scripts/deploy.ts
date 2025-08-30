import * as dotenv from "dotenv";
dotenv.config();
import hre from "hardhat";


async function main() {
  const { ethers } = hre;

  const baseUri = process.env.ERC1155_BASE_URI!;
  const authority = process.env.AUTHORITY_ADDRESS!;

  const [deployer] = await ethers.getSigners();
  console.log("🚀 Deploying with:", deployer.address);

  const Factory = await ethers.getContractFactory("GreenHydrogen1155");
  const contract = await Factory.deploy(baseUri, authority);

  // In ethers v6, wait for tx to be mined:
  const receipt = await contract.deploymentTransaction()?.wait();

  // contract address is available via .target in ethers v6
  console.log("✅ Deployed at:", (contract as any).target);
  console.log("   Tx hash   :", receipt?.hash);
  console.log("   Block     :", receipt?.blockNumber);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});