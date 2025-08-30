"use client";

import { WagmiProvider as Provider } from "wagmi";
import { wagmiConfig } from "@/lib/wagmi";

export default function WagmiProviderWrapper({ children }: { children: React.ReactNode }) {
  return <Provider config={wagmiConfig}>{children}</Provider>;
}