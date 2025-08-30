import { createConfig, http } from "wagmi";
import { injected } from "wagmi/connectors";
import { holesky } from "./holeskyChain";

export const wagmiConfig = createConfig({
  chains: [holesky],
  connectors: [injected()],
  transports: {
    [holesky.id]: http(holesky.rpcUrls.default.http[0]),
  },
});