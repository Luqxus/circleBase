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
      <div className="relative text-center py-16 px-4 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--app-accent)]/10 via-transparent to-[var(--app-accent)]/5"></div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="mb-8">
            {/* Animated icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[var(--app-accent)] to-[var(--app-accent)]/80 rounded-full mb-6 shadow-lg animate-pulse">
              <Icon name="heart" size="lg" className="text-white" />
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-[var(--app-foreground)] mb-6 leading-tight">
              Support Your
              <span className="block bg-gradient-to-r from-[var(--app-accent)] to-[var(--app-accent)]/70 bg-clip-text text-transparent">
                Favorite Creators
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-[var(--app-foreground-muted)] mb-10 max-w-3xl mx-auto leading-relaxed">
              A decentralized platform where content creators can receive direct funding from their supporters. 
              Built on Base blockchain for fast, secure, and low-cost transactions.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button
              variant="primary"
              size="lg"
              onClick={onConnectWallet}
              className="text-lg px-10 py-5 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              icon={<Icon name="heart" size="sm" />}
            >
              Connect Wallet to Start
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.open("https://base.org", "_blank")}
              className="text-lg px-10 py-5 border-2 hover:bg-[var(--app-accent)]/10 transition-all duration-300"
            >
              Learn About Base
            </Button>
          </div>

          {/* Enhanced Stats */}
          <div className="grid grid-cols-3 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="bg-[var(--app-card-bg)] backdrop-blur-md rounded-2xl p-6 border border-[var(--app-card-border)] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[var(--app-accent)] to-[var(--app-accent)]/70 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm md:text-base text-[var(--app-foreground-muted)] font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-4 bg-gradient-to-b from-transparent to-[var(--app-card-bg)]/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--app-foreground)] mb-6">
              How It Works
            </h2>
            <p className="text-xl text-[var(--app-foreground-muted)] max-w-2xl mx-auto">
              Simple, secure, and fast. Get started in minutes and support creators instantly.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <div key={index} className="group text-center">
                <div className="relative">
                  {/* Step number */}
                  <div className="absolute -top-2 -left-2 w-8 h-8 bg-[var(--app-accent)] rounded-full flex items-center justify-center text-white font-bold text-sm z-10">
                    {index + 1}
                  </div>
                  
                  {/* Feature card */}
                  <div className="bg-[var(--app-card-bg)] backdrop-blur-md rounded-2xl p-8 border border-[var(--app-card-border)] shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
                    <div className="w-20 h-20 bg-gradient-to-br from-[var(--app-accent)] to-[var(--app-accent)]/80 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300">
                      <Icon name={feature.icon as "heart" | "star" | "check"} size="lg" className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-[var(--app-foreground)] mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-[var(--app-foreground-muted)] leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Creator Showcase */}
      <div className="py-20 px-4 bg-gradient-to-br from-[var(--app-card-bg)] to-[var(--app-background)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--app-foreground)] mb-6">
              Featured Creators
            </h2>
            <p className="text-xl text-[var(--app-foreground-muted)] max-w-2xl mx-auto">
              Join thousands of creators already earning from their content
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                name: "Alice Johnson",
                username: "alice_crypto",
                bio: "Web3 developer sharing blockchain insights and tutorials",
                funds: "2.45 ETH",
                supporters: 23,
                avatar: "A"
              },
              {
                name: "Bob Chen",
                username: "bob_web3",
                bio: "DeFi educator helping people understand decentralized finance",
                funds: "1.89 ETH",
                supporters: 15,
                avatar: "B"
              },
              {
                name: "Carol Martinez",
                username: "carol_nft",
                bio: "NFT artist exploring the intersection of art and technology",
                funds: "3.12 ETH",
                supporters: 31,
                avatar: "C"
              }
            ].map((creator, index) => (
              <div key={index} className="group">
                <div className="bg-[var(--app-background)] backdrop-blur-md rounded-2xl p-8 border border-[var(--app-card-border)] shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
                  {/* Creator header */}
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-[var(--app-accent)] to-[var(--app-accent)]/80 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                        {creator.avatar}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-[var(--app-background)]"></div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-[var(--app-foreground)] mb-1">
                        {creator.name}
                      </h4>
                      <p className="text-[var(--app-foreground-muted)] font-medium">
                        @{creator.username}
                      </p>
                    </div>
                  </div>
                  
                  {/* Bio */}
                  <p className="text-[var(--app-foreground-muted)] mb-6 leading-relaxed">
                    {creator.bio}
                  </p>
                  
                  {/* Stats */}
                  <div className="flex justify-between items-center pt-4 border-t border-[var(--app-card-border)]">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[var(--app-accent)] mb-1">
                        {creator.funds}
                      </div>
                      <div className="text-xs text-[var(--app-foreground-muted)] uppercase tracking-wide">
                        Raised
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[var(--app-foreground)] mb-1">
                        {creator.supporters}
                      </div>
                      <div className="text-xs text-[var(--app-foreground-muted)] uppercase tracking-wide">
                        Supporters
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-4 bg-gradient-to-br from-[var(--app-accent)]/10 via-transparent to-[var(--app-accent)]/5">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-[var(--app-card-bg)] backdrop-blur-md rounded-3xl p-12 border border-[var(--app-card-border)] shadow-2xl">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[var(--app-accent)] to-[var(--app-accent)]/80 rounded-2xl mb-8 shadow-lg">
              <Icon name="heart" size="lg" className="text-white" />
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--app-foreground)] mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-[var(--app-foreground-muted)] mb-10 max-w-2xl mx-auto leading-relaxed">
              Connect your wallet to start supporting creators or create your own creator profile and begin earning from your content.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                variant="primary"
                size="lg"
                onClick={onConnectWallet}
                className="text-lg px-12 py-5 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                icon={<Icon name="heart" size="sm" />}
              >
                Connect Wallet
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => window.open("https://base.org", "_blank")}
                className="text-lg px-12 py-5 border-2 hover:bg-[var(--app-accent)]/10 transition-all duration-300"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="py-12 px-4 bg-[var(--app-card-bg)] border-t border-[var(--app-card-border)]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-[var(--app-accent)] to-[var(--app-accent)]/80 rounded-xl flex items-center justify-center">
                  <Icon name="heart" size="sm" className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[var(--app-foreground)]">Funder</h3>
              </div>
              <p className="text-[var(--app-foreground-muted)] mb-6 max-w-md">
                Supporting creators on the blockchain. Built on Base for fast, secure, and low-cost transactions.
              </p>
            </div>
            
            {/* Links */}
            <div>
              <h4 className="font-semibold text-[var(--app-foreground)] mb-4">Platform</h4>
              <div className="space-y-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open("https://base.org", "_blank")}
                  className="text-[var(--app-foreground-muted)] hover:text-[var(--app-foreground)] justify-start"
                >
                  Built on Base
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open("https://onchainkit.xyz", "_blank")}
                  className="text-[var(--app-foreground-muted)] hover:text-[var(--app-foreground)] justify-start"
                >
                  Powered by OnchainKit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open("https://farcaster.xyz", "_blank")}
                  className="text-[var(--app-foreground-muted)] hover:text-[var(--app-foreground)] justify-start"
                >
                  MiniKit Integration
                </Button>
              </div>
            </div>
            
            {/* Social */}
            <div>
              <h4 className="font-semibold text-[var(--app-foreground)] mb-4">Connect</h4>
              <div className="space-y-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open("https://twitter.com", "_blank")}
                  className="text-[var(--app-foreground-muted)] hover:text-[var(--app-foreground)] justify-start"
                >
                  Twitter
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open("https://discord.gg", "_blank")}
                  className="text-[var(--app-foreground-muted)] hover:text-[var(--app-foreground)] justify-start"
                >
                  Discord
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open("https://github.com", "_blank")}
                  className="text-[var(--app-foreground-muted)] hover:text-[var(--app-foreground)] justify-start"
                >
                  GitHub
                </Button>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-[var(--app-card-border)] text-center">
            <p className="text-[var(--app-foreground-muted)]">
              © 2024 Funder. Supporting creators on the blockchain.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
