import { defineChain } from "viem";

export const holesky = defineChain({
  id: 17000,
  name: "Ethereum Holesky",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ["https://ethereum-holesky-rpc.publicnode.com"] },
    public: { http: ["https://ethereum-holesky-rpc.publicnode.com"] },
  },
  blockExplorers: {
    default: {
      name: "Holesky Explorer",
      url: "https://explorer.etherscan.io", // or publicnode explorer
    },
  },
});