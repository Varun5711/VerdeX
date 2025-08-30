import * as dotenv from "dotenv";
dotenv.config();
import hre from "hardhat";


async function main() {
  const { ethers } = hre;
  const contractAddr = process.env.ERC1155_ADDRESS!;
  const contract = await ethers.getContractAt("GreenHydrogen1155", contractAddr);

  const [signer] = await ethers.getSigners();
  console.log("Using signer:", signer.address);

  // Example batch
  const batchId = "BatchXYZ";
  const tokenId = await contract.tokenIdFor(batchId);
  const amount = ethers.parseUnits("20", 0);

  // Authority issues to me
  console.log("⏳ Issuing credits...");
  const issueTx = await contract.connect(signer).issue(batchId, signer.address, amount, "docHash123");
  await issueTx.wait();
  console.log("✅ Issued", amount.toString(), "to", signer.address);

  // Retire half
  console.log("⏳ Retiring 10...");
  const retireTx = await contract.connect(signer).retire(tokenId, 10, "claimRef-001");
  await retireTx.wait();
  console.log("✅ Retired 10 from", signer.address);

  // Check balances
  const bal = await contract.balanceOf(signer.address, tokenId);
  console.log("Remaining balance:", bal.toString());
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});