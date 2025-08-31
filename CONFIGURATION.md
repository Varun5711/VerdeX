# Configuration Guide

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
CLERK_SECRET_KEY=your_clerk_secret_key_here

# Convex Backend
NEXT_PUBLIC_CONVEX_URL=your_convex_url_here

# Admin Password for Role Upgrades
NEXT_PUBLIC_ADMIN_PASSWORD=your_admin_password_here

# Optional: Additional Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Role Upgrade Password

The `NEXT_PUBLIC_ADMIN_PASSWORD` is used to verify role upgrades. When a user tries to upgrade their roles to include AUTHORITY or CERTIFIER, they must provide this password.

**Security Note**: This password is stored in the client-side environment variable for demo purposes. In production, this should be handled server-side with proper authentication.

## Default Roles

When a user first logs in, they are automatically assigned the following roles:
- `BUYER` - Can purchase and manage hydrogen credits
- `PRODUCER` - Can create and manage production facilities

## Advanced Roles

To access AUTHORITY and CERTIFIER roles, users must:
1. Click the crown icon (👑) in the sidebar
2. Enter the admin password
3. Successfully verify the password

These roles provide access to:
- **AUTHORITY**: Compliance monitoring, audits, regulatory functions
- **CERTIFIER**: Certificate issuance, quality standards, review processes

## Wallet Integration

The application supports MetaMask wallet integration:
- Users can connect their wallet from the public navbar
- Connected wallets are automatically linked to user accounts
- Wallet addresses are displayed in the dashboard header
- Wallet connection status is managed globally

## Data Sources

The application fetches real data from:
- **Convex Backend**: User data, facilities, batches, certificates, retirements
- **Smart Contracts**: Blockchain verification and transactions
- **Clerk**: Authentication and user management
- **Wagmi**: Wallet connection and Web3 functionality

## Production Deployment

For production deployment:
1. Set up proper environment variables
2. Configure Clerk for production
3. Deploy Convex backend
4. Set up proper admin authentication
5. Configure wallet networks (mainnet/testnet)
6. Set up monitoring and logging

## Security Considerations

- Admin password should be strong and unique
- Consider implementing rate limiting for role upgrades
- Monitor wallet connections for suspicious activity
- Implement proper session management
- Use HTTPS in production
- Regular security audits recommended
