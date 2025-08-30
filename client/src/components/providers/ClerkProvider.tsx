"use client";

import { ClerkProvider as Provider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function ClerkProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Provider
      appearance={{
        baseTheme: dark,
      }}
    >
      {children}
    </Provider>
  );
}