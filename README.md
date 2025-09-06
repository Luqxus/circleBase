# Funder - Creator Funding Platform

A decentralized platform built on Base that allows content creators to receive direct funding from their supporters. Built with Next.js, OnchainKit, and MiniKit for seamless Web3 integration.

## Features

### 🎯 Core Functionality
- **Creator Discovery**: Browse and discover content creators across different platforms
- **Direct Funding**: Send ETH directly to creators with optional messages
- **Shareable Links**: Creators can share their funding pages on social media (X, YouTube, Instagram)
- **Transaction History**: Track all funding transactions with blockchain verification
- **Real-time Notifications**: Get notified when you receive or send funds

### 👤 Creator Features
- **Profile Management**: Create and customize creator profiles with bio and social links
- **Analytics Dashboard**: View total funds raised and supporter count
- **Social Integration**: Connect Twitter, YouTube, and Instagram accounts
- **Share Tools**: Generate shareable funding links for social media

### 💰 Supporter Features
- **Easy Discovery**: Search and find creators by name, username, or bio
- **Secure Transactions**: All transactions are secured by Base blockchain
- **Message Support**: Add personal messages when funding creators
- **Transaction Tracking**: View all your funding history

## Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Blockchain**: Base (Ethereum L2)
- **Web3 Integration**: OnchainKit, MiniKit, Wagmi, Viem
- **Styling**: Tailwind CSS with custom theme
- **State Management**: React hooks and context
- **Notifications**: Farcaster Frame SDK

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun
- Base wallet (Coinbase Wallet, MetaMask, etc.)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd funder
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Add your OnchainKit API key and other required environment variables:
```env
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_api_key_here
NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME=Funder
NEXT_PUBLIC_URL=http://localhost:3000
NEXT_PUBLIC_APP_HERO_IMAGE=your_hero_image_url
NEXT_PUBLIC_SPLASH_IMAGE=your_splash_image_url
NEXT_PUBLIC_SPLASH_BACKGROUND_COLOR=#0052FF
NEXT_PUBLIC_ICON_URL=your_icon_url
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### For Creators

1. **Create Profile**: 
   - Connect your wallet
   - Go to "My Profile" tab
   - Fill in your creator information
   - Add social media links

2. **Share Your Link**:
   - Copy your funding link from the profile page
   - Share on X, YouTube, Instagram, or other platforms
   - Supporters can click the link to fund you directly

3. **Track Performance**:
   - View total funds raised
   - See supporter count
   - Monitor transaction history

### For Supporters

1. **Discover Creators**:
   - Browse the "Discover" tab
   - Search for specific creators
   - View creator profiles and stats

2. **Fund Creators**:
   - Click "Fund Creator" on any profile
   - Enter amount in ETH
   - Add optional message
   - Confirm transaction

3. **Track Activity**:
   - View your funding history in "Activity" tab
   - See transaction details and blockchain links

## Project Structure

```
funder/
├── app/
│   ├── components/
│   │   ├── DemoComponents.tsx      # Base UI components
│   │   ├── FunderComponents.tsx    # Core funder functionality
│   │   └── CreatorSetup.tsx        # Creator profile management
│   ├── fund/
│   │   └── [creatorId]/
│   │       └── page.tsx            # Individual creator funding pages
│   ├── api/                        # API routes
│   ├── globals.css                 # Global styles
│   ├── layout.tsx                  # Root layout
│   └── page.tsx                    # Main app page
├── lib/
│   ├── notification.ts             # Notification utilities
│   ├── notification-client.ts      # Client-side notifications
│   └── redis.ts                    # Redis configuration
└── public/                         # Static assets
```

## Key Components

### FunderComponents.tsx
- `CreatorProfile`: Display creator information and stats
- `FundingModal`: Handle funding transactions
- `CreatorDiscovery`: Browse and search creators
- `TransactionHistory`: Show funding history
- `ShareLink`: Generate shareable funding links

### CreatorSetup.tsx
- `CreatorSetup`: Form to create new creator profiles
- `CreatorProfileManager`: Edit and manage existing profiles

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically

### Deploy to Base

The app is optimized for Base blockchain and can be deployed as a Mini App on Farcaster.

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@funder.app or join our Discord community.

## Acknowledgments

- Built with [OnchainKit](https://onchainkit.xyz) by Coinbase
- Powered by [Base](https://base.org) blockchain
- Integrated with [Farcaster](https://farcaster.xyz) MiniKit