# Green Hydrogen Credits Platform

A blockchain-based platform for issuing, tracking, and retiring certified green hydrogen credits with immutable on-chain proof.

## 🚀 Features

### Authentication & User Management
- **Clerk Integration**: Secure authentication with social logins and email/password
- **Role-Based Access Control**: Dynamic role assignment and management
- **Automatic Role Assignment**: New users get BUYER and PRODUCER roles by default
- **Role Upgrades**: Secure password-protected role upgrades for AUTHORITY and CERTIFIER access

### Wallet Integration
- **MetaMask Support**: Seamless wallet connection and management
- **Conditional Display**: Wallet button shows/hides based on connection status
- **Address Linking**: Automatic linking of wallet addresses to user accounts
- **Multi-Chain Support**: Ethereum mainnet and Holesky testnet support

### Dashboard & Analytics
- **Role-Specific Dashboards**: Customized views for Producers, Buyers, Authorities, and Certifiers
- **Real-Time Data**: Live data from Convex backend and smart contracts
- **Interactive Charts**: Production metrics, transaction history, and compliance tracking
- **Quick Actions**: Role-specific action panels for common tasks

### Production Management
- **Facility Registration**: Register and manage hydrogen production facilities
- **Batch Tracking**: Monitor production batches with blockchain verification
- **Certificate Issuance**: Generate and manage hydrogen credit certificates
- **Inventory Management**: Track available credits and production capacity

### Marketplace & Trading
- **Credit Marketplace**: Buy and sell hydrogen credits
- **Order Management**: Track purchase orders and delivery status
- **Portfolio Tracking**: Monitor owned credits and retirement history
- **Price Discovery**: Real-time pricing and market analytics

### Compliance & Auditing
- **Regulatory Compliance**: Authority tools for monitoring and enforcement
- **Audit Trails**: Complete blockchain-based audit trails
- **Quality Standards**: Certifier tools for quality assurance
- **Reporting**: Comprehensive reporting and analytics

## 🏗️ Architecture

### Frontend Stack
- **Next.js 15**: React framework with App Router
- **React 19**: Latest React with hooks and functional components
- **TypeScript**: Type-safe development
- **TailwindCSS**: Utility-first CSS framework
- **Framer Motion**: Smooth animations and transitions

### Backend & Database
- **Convex**: Real-time backend with automatic sync
- **Clerk**: Authentication and user management
- **Wagmi**: Web3 integration and wallet management

### Blockchain Integration
- **Ethereum**: Main blockchain network
- **Holesky**: Testnet for development
- **Smart Contracts**: ERC-1155 tokens for hydrogen credits
- **IPFS**: Decentralized storage for documents

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- MetaMask wallet extension
- Convex account
- Clerk account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd VerdeX
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your configuration:
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
   CLERK_SECRET_KEY=your_clerk_secret
   NEXT_PUBLIC_CONVEX_URL=your_convex_url
   NEXT_PUBLIC_ADMIN_PASSWORD=your_admin_password
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 👥 User Roles

### Producer
- Register production facilities
- Create and track production batches
- Issue hydrogen credit certificates
- Monitor production metrics
- Manage inventory

### Buyer
- Browse hydrogen credit marketplace
- Purchase credits
- Track order history
- Manage credit portfolio
- Retire credits for carbon offset

### Authority
- Monitor platform compliance
- Conduct audits and inspections
- Enforce regulatory standards
- Generate compliance reports
- Manage entity registrations

### Certifier
- Review and approve certificates
- Set quality standards
- Conduct quality audits
- Issue certification reports
- Maintain audit trails

## 🔐 Security Features

### Authentication
- Secure user authentication via Clerk
- Role-based access control
- Session management
- Password-protected role upgrades

### Wallet Security
- MetaMask integration
- Address verification
- Transaction signing
- Multi-signature support

### Data Protection
- Encrypted data transmission
- Secure API endpoints
- Audit logging
- Compliance monitoring

## 📊 Data Sources

The platform integrates with multiple data sources:

- **Convex Backend**: User data, facilities, batches, certificates
- **Smart Contracts**: Blockchain verification and transactions
- **Clerk**: Authentication and user management
- **Wagmi**: Wallet connection and Web3 functionality
- **IPFS**: Decentralized document storage

## 🎨 Design System

### Color Palette
- **Primary**: Green (#10B981) - Sustainability and growth
- **Secondary**: Blue (#3B82F6) - Trust and reliability
- **Accent**: Purple (#8B5CF6) - Innovation and technology
- **Neutral**: Gray scale for UI elements

### Components
- Modular, reusable components
- Responsive design patterns
- Accessibility compliant
- Dark theme optimized

## 📱 Responsive Design

- **Mobile-first approach**
- **Tablet optimization**
- **Desktop enhancement**
- **Touch-friendly interfaces**

## 🚀 Deployment

### Production Setup
1. Configure environment variables
2. Deploy Convex backend
3. Set up Clerk production environment
4. Configure wallet networks
5. Deploy to Vercel or similar platform

### Environment Variables
See `CONFIGURATION.md` for detailed setup instructions.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Check the documentation
- Review the configuration guide
- Open an issue on GitHub
- Contact the development team

## 🔮 Future Enhancements

- **Multi-chain Support**: Additional blockchain networks
- **Advanced Analytics**: Machine learning insights
- **Mobile App**: Native mobile application
- **API Integration**: Third-party service integrations
- **Advanced Compliance**: Automated compliance checking

---

**Built with ❤️ for a sustainable future**
