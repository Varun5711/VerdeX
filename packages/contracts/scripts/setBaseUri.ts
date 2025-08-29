import * as dotenv from "dotenv";
dotenv.config();
import hre from "hardhat";

async function main() {
  const { ethers } = hre;
  const contractAddr = process.env.ERC1155_ADDRESS!;
  const newUri = process.env.ERC1155_BASE_URI!;

  const contract = await ethers.getContractAt("GreenHydrogen1155", contractAddr);
  const tx = await contract.setBaseURI(newUri);
  await tx.wait();

  console.log("✅ BaseURI updated to:", newUri);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});