# VerdeX Package Installation Guide

## 🚀 Complete Package Installation

This guide ensures all required packages are properly installed for the VerdeX project.

### 1. Clean Installation (Recommended)

```bash
# Remove existing node_modules and lock files
rm -rf node_modules package-lock.json

# Install all dependencies fresh
npm install
```

### 2. Install Missing Packages (if needed)

If you encounter any missing package errors, install them individually:

```bash
# Core dependencies
npm install @clerk/nextjs@^6.31.6
npm install @clerk/themes@^2.4.15
npm install @radix-ui/react-slot@^1.2.3
npm install class-variance-authority@^0.7.1
npm install clsx@^2.1.1
npm install convex@^1.26.2
npm install ethers@^6.11.1
npm install gsap@^3.13.0
npm install lucide-react@^0.542.0
npm install motion@^12.23.12
npm install next@15.5.2
npm install next-themes@^0.4.6
npm install ogl@^0.0.78
npm install react@^19.1.0
npm install react-dom@19.1.0
npm install simplex-noise@^4.0.3
npm install svix@^1.75.0
npm install tailwind-merge@^3.3.1
npm install viem@^2.36.0
npm install wagmi@^2.16.9

# Development dependencies
npm install --save-dev @eslint/eslintrc@^3
npm install --save-dev @tailwindcss/postcss@^4
npm install --save-dev @types/node@^20
npm install --save-dev @types/react@^19
npm install --save-dev @types/react-dom@^19
npm install --save-dev eslint@^9
npm install --save-dev eslint-config-next@15.5.2
npm install --save-dev tailwindcss@^4
npm install --save-dev tw-animate-css@^1.3.7
npm install --save-dev typescript@^5
```

### 3. Verify Installation

Check that all packages are properly installed:

```bash
# Check installed packages
npm list --depth=0

# Check for any missing peer dependencies
npm ls
```

### 4. Common Issues & Solutions

#### Issue: Peer dependency warnings
```bash
# Install peer dependencies
npm install --legacy-peer-deps
```

#### Issue: TypeScript compilation errors
```bash
# Check TypeScript configuration
npx tsc --noEmit

# Install missing type definitions
npm install --save-dev @types/[package-name]
```

#### Issue: Convex connection errors
```bash
# Ensure Convex is properly configured
npx convex dev
```

#### Issue: Tailwind CSS not working
```bash
# Rebuild Tailwind CSS
npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch
```

### 5. Package Categories

#### Core Application
- **Next.js 15**: React framework with App Router
- **React 19**: Latest React with new features
- **TypeScript**: Type safety and developer experience

#### Authentication & Backend
- **Clerk**: User authentication and management
- **Convex**: Real-time backend and database (includes react-clerk integration)

#### Blockchain & Web3
- **Ethers.js**: Ethereum library for smart contract interaction
- **Wagmi**: React hooks for Ethereum
- **Viem**: Low-level Ethereum interface

#### UI & Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible UI primitives
- **Lucide React**: Icon library
- **GSAP**: Animation library
- **Motion**: Animation library

#### 3D & Graphics
- **OGL**: WebGL library for 3D graphics
- **Simplex Noise**: Procedural noise generation

#### Utilities
- **CLSX**: Conditional className utility
- **Class Variance Authority**: Component variant management
- **Tailwind Merge**: Tailwind class merging utility

### 6. Development Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Type checking
npm run type-check

# Convex development
npm run convex:dev

# Deploy Convex functions
npm run convex:deploy

# Generate Convex types
npm run convex:codegen
```

### 7. Environment Setup

Ensure you have the following environment variables set in `.env.local`:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
CLERK_SECRET_KEY=sk_test_your_key_here
CLERK_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Convex Backend
NEXT_PUBLIC_CONVEX_URL=https://your-project.convex.cloud

# Ethereum Configuration
NEXT_PUBLIC_CHAIN_ID=17000
NEXT_PUBLIC_CHAIN_NAME="Holesky Testnet"
NEXT_PUBLIC_RPC_URL=https://ethereum-holesky.publicnode.com
NEXT_PUBLIC_EXPLORER_URL=https://holesky.etherscan.io

# Smart Contracts
NEXT_PUBLIC_GREEN_HYDROGEN_CONTRACT=0xYourContractAddressHere
NEXT_PUBLIC_REGISTRY_CONTRACT=0xYourRegistryAddressHere

# Wallet Connect
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id_here
```

### 8. Post-Installation Steps

1. **Start Convex Backend**:
   ```bash
   npm run convex:dev
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```

3. **Verify Installation**:
   - Check that the app loads without errors
   - Verify all components render properly
   - Test authentication flow
   - Check blockchain integration

### 9. Troubleshooting

#### Package Version Conflicts
```bash
# Check for version conflicts
npm ls [package-name]

# Force install specific version
npm install [package-name]@[version] --force
```

#### Build Errors
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
npm install

# Rebuild
npm run build
```

#### TypeScript Errors
```bash
# Check TypeScript configuration
npx tsc --showConfig

# Install missing types
npm install --save-dev @types/[package-name]
```

## ✅ Installation Complete!

Your VerdeX project should now have all required packages installed and be ready for development. If you encounter any issues, refer to the troubleshooting section above or check the project documentation.

Happy coding! 🚀
