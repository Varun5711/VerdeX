import { http, createConfig } from "wagmi";
import { metaMask, coinbaseWallet, walletConnect } from "wagmi/connectors";
import { holesky } from "viem/chains";

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "";

export const wagmiConfig = createConfig({
  chains: [holesky],
  connectors: [
    metaMask(),
    coinbaseWallet({ appName: "GreenH2" }),
    projectId ? walletConnect({ projectId }) : undefined!,
  ].filter(Boolean),
  transports: {
    [holesky.id]: http(process.env.NEXT_PUBLIC_HOLESKY_RPC_URL),
  },
});