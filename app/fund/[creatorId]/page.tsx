"use client";

import { useParams } from "next/navigation";
import { useState, useCallback, useEffect } from "react";
import { useAccount } from "wagmi";
import {
  Name,
  Identity,
  Address,
  Avatar,
  EthBalance,
} from "@coinbase/onchainkit/identity";
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet";
import { 
  CreatorProfile, 
  FundingModal, 
  type Creator,
  type FundingTransaction
} from "../../components/FunderComponents";
import { Button } from "../../components/DemoComponents";
import { Icon } from "../../components/DemoComponents";
import { LandingPage } from "../../components/LandingPage";
import { useCreators, useTransactions } from "../../hooks/useCreators";

// Sample creator data - in a real app, this would be fetched from an API
const SAMPLE_CREATORS: Record<string, Creator> = {
  "1": {
    id: "1",
    name: "Alice Johnson",
    username: "alice_crypto",
    walletAddress: "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6",
    bio: "Web3 developer and content creator sharing the latest in blockchain technology",
    totalFunds: 2.45,
    supporters: 23,
    socialLinks: {
      twitter: "https://twitter.com/alice_crypto",
      youtube: "https://youtube.com/@alice_crypto"
    }
  },
  "2": {
    id: "2", 
    name: "Bob Chen",
    username: "bob_web3",
    walletAddress: "0x8ba1f109551bD432803012645Hac136c",
    bio: "DeFi enthusiast and educator helping people understand decentralized finance",
    totalFunds: 1.89,
    supporters: 15,
    socialLinks: {
      twitter: "https://twitter.com/bob_web3",
      instagram: "https://instagram.com/bob_web3"
    }
  },
  "3": {
    id: "3",
    name: "Carol Martinez", 
    username: "carol_nft",
    walletAddress: "0x1234567890123456789012345678901234567890",
    bio: "NFT artist and digital creator exploring the intersection of art and technology",
    totalFunds: 3.12,
    supporters: 31,
    socialLinks: {
      twitter: "https://twitter.com/carol_nft",
      youtube: "https://youtube.com/@carol_nft"
    }
  }
};

export default function CreatorFundingPage() {
  const params = useParams();
  const creatorId = params.creatorId as string;
  const { isConnected } = useAccount();
  const [isFundingModalOpen, setIsFundingModalOpen] = useState(false);
  const [creator, setCreator] = useState<Creator | null>(null);
  const [loading, setLoading] = useState(true);

  const { getCreatorById } = useCreators();
  const { createTransaction, transactions } = useTransactions();

  const handleConnectWallet = useCallback(() => {
    // This will trigger the wallet connection through the ConnectWallet component
  }, []);

  // Load creator data
  useEffect(() => {
    const loadCreator = async () => {
      try {
        setLoading(true);
        const creatorData = await getCreatorById(creatorId);
        setCreator(creatorData);
      } catch (error) {
        console.error('Error loading creator:', error);
      } finally {
        setLoading(false);
      }
    };

    if (creatorId) {
      loadCreator();
    }
  }, [creatorId, getCreatorById]);

  const handleFundCreator = useCallback(() => {
    if (creator) {
      setIsFundingModalOpen(true);
    }
  }, [creator]);

  const handleFundingSuccess = useCallback(async (transaction: FundingTransaction) => {
    try {
      await createTransaction(transaction);
    } catch (error) {
      console.error('Error saving transaction:', error);
    }
  }, [createTransaction]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen font-sans text-[var(--app-foreground)] mini-app-theme from-[var(--app-background)] to-[var(--app-gray)]">
        <div className="w-full max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <Icon name="heart" size="lg" className="text-[var(--app-foreground-muted)] mx-auto mb-4" />
              <h1 className="text-xl font-semibold text-[var(--app-foreground)] mb-2">
                Loading Creator...
              </h1>
              <p className="text-[var(--app-foreground-muted)]">
                Please wait while we load the creator information.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!creator) {
    return (
      <div className="flex flex-col min-h-screen font-sans text-[var(--app-foreground)] mini-app-theme from-[var(--app-background)] to-[var(--app-gray)]">
        <div className="w-full max-w-md mx-auto px-4 py-3">
          <header className="flex justify-between items-center mb-3 h-11">
            <div className="flex items-center space-x-2">
              <Wallet className="z-10">
                <ConnectWallet>
                  <Name className="text-inherit" />
                </ConnectWallet>
                <WalletDropdown>
                  <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                    <Avatar />
                    <Name />
                    <Address />
                    <EthBalance />
                  </Identity>
                  <WalletDropdownDisconnect />
                </WalletDropdown>
              </Wallet>
            </div>
          </header>
          
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <Icon name="heart" size="lg" className="text-[var(--app-foreground-muted)] mx-auto mb-4" />
              <h1 className="text-xl font-semibold text-[var(--app-foreground)] mb-2">
                Creator Not Found
              </h1>
              <p className="text-[var(--app-foreground-muted)] mb-4">
                The creator you're looking for doesn't exist or has been removed.
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                <p className="text-yellow-800 text-sm">
                  <strong>Note:</strong> If you just created this creator profile, it may not be available due to Firebase connection issues. Try refreshing the page or check the Activity tab for connection status.
                </p>
              </div>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.history.back()}
                  icon={<Icon name="arrow-right" size="sm" className="rotate-180" />}
                >
                  Go Back
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => window.location.href = '/'}
                >
                  Browse Creators
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show landing page if not connected
  if (!isConnected) {
    return (
      <div className="flex flex-col min-h-screen font-sans text-[var(--app-foreground)] mini-app-theme from-[var(--app-background)] to-[var(--app-gray)]">
        <div className="w-full max-w-md mx-auto px-4 py-3">
          <header className="flex justify-between items-center mb-3 h-11">
            <div className="flex items-center space-x-2">
              <Wallet className="z-10">
                <ConnectWallet>
                  <Name className="text-inherit" />
                </ConnectWallet>
                <WalletDropdown>
                  <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                    <Avatar />
                    <Name />
                    <Address />
                    <EthBalance />
                  </Identity>
                  <WalletDropdownDisconnect />
                </WalletDropdown>
              </Wallet>
            </div>
          </header>
          
          <LandingPage onConnectWallet={handleConnectWallet} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen font-sans text-[var(--app-foreground)] mini-app-theme from-[var(--app-background)] to-[var(--app-gray)]">
      <div className="w-full max-w-md mx-auto px-4 py-3">
        <header className="flex justify-between items-center mb-6 h-11">
          <div className="flex items-center space-x-2">
            <Wallet className="z-10">
              <ConnectWallet>
                <Name className="text-inherit" />
              </ConnectWallet>
              <WalletDropdown>
                <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                  <Avatar />
                  <Name />
                  <Address />
                  <EthBalance />
                </Identity>
                <WalletDropdownDisconnect />
              </WalletDropdown>
            </Wallet>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.history.back()}
            icon={<Icon name="arrow-right" size="sm" className="rotate-180" />}
          >
            Back
          </Button>
        </header>

        <main className="flex-1 space-y-6">
          {/* Hero Section */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-[var(--app-foreground)] mb-2">
              Support {creator.name}
            </h1>
            <p className="text-[var(--app-foreground-muted)]">
              Help this creator continue making amazing content
            </p>
          </div>

          {/* Creator Profile */}
          <CreatorProfile 
            creator={creator} 
            onFund={handleFundCreator}
            className="animate-fade-in"
          />

          {/* Call to Action */}
          <div className="bg-[var(--app-card-bg)] backdrop-blur-md rounded-xl shadow-lg border border-[var(--app-card-border)] p-5 text-center">
            <Icon name="heart" size="lg" className="text-[var(--app-accent)] mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-[var(--app-foreground)] mb-2">
              Show Your Support
            </h3>
            <p className="text-[var(--app-foreground-muted)] mb-4">
              Every contribution helps creators continue their work and reach more people.
            </p>
            <Button
              variant="primary"
              size="lg"
              onClick={handleFundCreator}
              className="w-full"
              icon={<Icon name="heart" size="sm" />}
            >
              Fund {creator.name}
            </Button>
          </div>

          {/* Recent Activity */}
          {transactions.length > 0 && (
            <div className="bg-[var(--app-card-bg)] backdrop-blur-md rounded-xl shadow-lg border border-[var(--app-card-border)] p-5">
              <h3 className="text-lg font-semibold text-[var(--app-foreground)] mb-4">
                Recent Support
              </h3>
              <div className="space-y-3">
                {transactions.slice(0, 3).map((tx) => (
                  <div key={tx.id} className="flex items-center space-x-3 p-3 bg-[var(--app-background)] rounded-lg">
                    <div className="w-8 h-8 bg-[var(--app-accent)] rounded-full flex items-center justify-center">
                      <Icon name="heart" size="sm" className="text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[var(--app-foreground)]">
                        {tx.amount} ETH received
                      </p>
                      {tx.message && (
                        <p className="text-xs text-[var(--app-foreground-muted)]">
                          "{tx.message}"
                        </p>
                      )}
                    </div>
                    <span className="text-xs text-[var(--app-foreground-muted)]">
                      {new Date(tx.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>

        <footer className="mt-8 pt-4 flex justify-center">
          <Button
            variant="ghost"
            size="sm"
            className="text-[var(--ock-text-foreground-muted)] text-xs"
            onClick={() => window.open("https://base.org/builders/minikit", "_blank")}
          >
            Built on Base with MiniKit
          </Button>
        </footer>
      </div>

      {/* Funding Modal */}
      <FundingModal
        creator={creator}
        isOpen={isFundingModalOpen}
        onClose={() => setIsFundingModalOpen(false)}
        onSuccess={handleFundingSuccess}
      />
    </div>
  );
}
