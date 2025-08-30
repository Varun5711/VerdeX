import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@typechain/hardhat";
import * as dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    holesky: {
      url: "https://ethereum-holesky.publicnode.com",
      accounts: [process.env.DEPLOYER_PRIVATE_KEY!],
      chainId: 17000,
    } as any,
  },
  etherscan: { apiKey: process.env.ETHERSCAN_API_KEY || "" },
};
export default config;