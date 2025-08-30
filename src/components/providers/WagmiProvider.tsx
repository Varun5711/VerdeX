// src/components/providers/WagmiProvider.tsx
"use client";

import { WagmiProvider as BaseWagmiProvider, createConfig, http } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { mainnet, holesky } from "wagmi/chains";
import { injected } from "wagmi/connectors";

const queryClient = new QueryClient();

const config = createConfig({
  chains: [holesky, mainnet],
  connectors: [injected()],
  transports: {
    [holesky.id]: http(),
    [mainnet.id]: http(),
  },
});

export default function WagmiProvider({ children }: { children: React.ReactNode }) {
  return (
    <BaseWagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </BaseWagmiProvider>
  );
}