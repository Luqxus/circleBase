"use client";

import { Button } from "./DemoComponents";
import { Icon } from "./DemoComponents";

type LandingPageProps = {
  onConnectWallet: () => void;
  className?: string;
};

export function LandingPage({ onConnectWallet, className = "" }: LandingPageProps) {
  const features = [
    {
      icon: "heart",
      title: "Support Creators",
      description: "Send ETH directly to your favorite content creators with just a few clicks"
    },
    {
      icon: "star",
      title: "Create & Share",
      description: "Set up your creator profile and share funding links on social media"
    },
    {
      icon: "check",
      title: "Secure & Fast",
      description: "Built on Base blockchain for fast, low-cost transactions"
    }
  ];

  const stats = [
    { number: "500+", label: "Active Creators" },
    { number: "2.5K+", label: "ETH Raised" },
    { number: "10K+", label: "Supporters" }
  ];

  return (
    <div className={`min-h-screen ${className}`}>
      {/* Hero Section */}
      <div className="text-center py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <Icon name="heart" size="lg" className="text-[var(--app-accent)] mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-[var(--app-foreground)] mb-4">
              Support Your Favorite Creators
            </h1>
            <p className="text-xl text-[var(--app-foreground-muted)] mb-8">
              A decentralized platform where content creators can receive direct funding from their supporters. 
              Built on Base blockchain for fast, secure, and low-cost transactions.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              variant="primary"
              size="lg"
              onClick={onConnectWallet}
              className="text-lg px-8 py-4"
              icon={<Icon name="heart" size="sm" />}
            >
              Connect Wallet to Start
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.open("https://base.org", "_blank")}
              className="text-lg px-8 py-4"
            >
              Learn About Base
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mb-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-[var(--app-accent)] mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-[var(--app-foreground-muted)]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[var(--app-foreground)] mb-12">
            How It Works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-[var(--app-accent)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name={feature.icon as any} size="lg" className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[var(--app-foreground)] mb-3">
                  {feature.title}
                </h3>
                <p className="text-[var(--app-foreground-muted)]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Creator Showcase */}
      <div className="py-12 px-4 bg-[var(--app-card-bg)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[var(--app-foreground)] mb-12">
            Featured Creators
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                name: "Alice Johnson",
                username: "alice_crypto",
                bio: "Web3 developer sharing blockchain insights",
                funds: "2.45 ETH",
                supporters: 23
              },
              {
                name: "Bob Chen",
                username: "bob_web3",
                bio: "DeFi educator helping people understand finance",
                funds: "1.89 ETH",
                supporters: 15
              },
              {
                name: "Carol Martinez",
                username: "carol_nft",
                bio: "NFT artist exploring digital creativity",
                funds: "3.12 ETH",
                supporters: 31
              }
            ].map((creator, index) => (
              <div key={index} className="bg-[var(--app-background)] rounded-xl p-6 border border-[var(--app-card-border)]">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-[var(--app-accent)] rounded-full flex items-center justify-center text-white font-bold">
                    {creator.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--app-foreground)]">
                      {creator.name}
                    </h4>
                    <p className="text-sm text-[var(--app-foreground-muted)]">
                      @{creator.username}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-[var(--app-foreground-muted)] mb-4">
                  {creator.bio}
                </p>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--app-accent)] font-medium">
                    {creator.funds} raised
                  </span>
                  <span className="text-[var(--app-foreground-muted)]">
                    {creator.supporters} supporters
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[var(--app-foreground)] mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-[var(--app-foreground-muted)] mb-8">
            Connect your wallet to start supporting creators or create your own creator profile
          </p>
          <Button
            variant="primary"
            size="lg"
            onClick={onConnectWallet}
            className="text-lg px-8 py-4"
            icon={<Icon name="heart" size="sm" />}
          >
            Connect Wallet
          </Button>
        </div>
      </div>

      {/* Footer */}
      <div className="py-8 px-4 border-t border-[var(--app-card-border)]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center space-x-6 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.open("https://base.org", "_blank")}
              className="text-[var(--app-foreground-muted)]"
            >
              Built on Base
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.open("https://onchainkit.xyz", "_blank")}
              className="text-[var(--app-foreground-muted)]"
            >
              Powered by OnchainKit
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.open("https://farcaster.xyz", "_blank")}
              className="text-[var(--app-foreground-muted)]"
            >
              MiniKit Integration
            </Button>
          </div>
          <p className="text-sm text-[var(--app-foreground-muted)]">
            © 2024 Funder. Supporting creators on the blockchain.
          </p>
        </div>
      </div>
    </div>
  );
}
