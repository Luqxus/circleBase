"use client";

import { type ReactNode, useCallback, useMemo, useState, useEffect } from "react";
import { useAccount } from "wagmi";
import {
  Transaction,
  TransactionButton,
  TransactionToast,
  TransactionToastAction,
  TransactionToastIcon,
  TransactionToastLabel,
  TransactionError,
  TransactionResponse,
  TransactionStatusAction,
  TransactionStatusLabel,
  TransactionStatus,
} from "@coinbase/onchainkit/transaction";
import { useNotification } from "@coinbase/onchainkit/minikit";
import { Button } from "./DemoComponents";
import { Icon } from "./DemoComponents";

// Types
export interface Creator {
  id: string;
  name: string;
  username: string;
  walletAddress: string;
  bio?: string;
  avatar?: string;
  socialLinks?: {
    twitter?: string;
    youtube?: string;
    instagram?: string;
  };
  totalFunds: number;
  supporters: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface FundingTransaction {
  id: string;
  from: string;
  to: string;
  amount: number;
  message?: string;
  timestamp: number;
  txHash: string;
}

// Creator Profile Card Component
type CreatorProfileProps = {
  creator: Creator;
  onFund?: (creator: Creator) => void;
  className?: string;
};

export function CreatorProfile({ creator, onFund, className = "" }: CreatorProfileProps) {
  return (
    <div className={`bg-[var(--app-card-bg)] backdrop-blur-md rounded-xl shadow-lg border border-[var(--app-card-border)] overflow-hidden transition-all hover:shadow-xl ${className}`}>
      <div className="p-5">
        <div className="flex items-start space-x-4 mb-4">
          <div className="w-16 h-16 bg-[var(--app-accent)] rounded-full flex items-center justify-center text-white text-xl font-bold">
            {creator.avatar || creator.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-[var(--app-foreground)]">
              {creator.name}
            </h3>
            <p className="text-[var(--app-foreground-muted)] text-sm">
              @{creator.username}
            </p>
            {creator.bio && (
              <p className="text-[var(--app-foreground-muted)] text-sm mt-2">
                {creator.bio}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-[var(--app-accent)]">
              {creator.totalFunds.toFixed(4)} ETH
            </p>
            <p className="text-xs text-[var(--app-foreground-muted)]">Total Raised</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-[var(--app-foreground)]">
              {creator.supporters}
            </p>
            <p className="text-xs text-[var(--app-foreground-muted)]">Supporters</p>
          </div>
        </div>

        {creator.socialLinks && (
          <div className="flex space-x-2 mb-4">
            {creator.socialLinks.twitter && (
              <a
                href={creator.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--app-foreground-muted)] hover:text-[var(--app-accent)]"
              >
                <Icon name="twitter" size="sm" />
              </a>
            )}
            {creator.socialLinks.youtube && (
              <a
                href={creator.socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--app-foreground-muted)] hover:text-[var(--app-accent)]"
              >
                <Icon name="youtube" size="sm" />
              </a>
            )}
            {creator.socialLinks.instagram && (
              <a
                href={creator.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--app-foreground-muted)] hover:text-[var(--app-accent)]"
              >
                <Icon name="instagram" size="sm" />
              </a>
            )}
          </div>
        )}

        {onFund && (
          <Button
            variant="primary"
            size="lg"
            onClick={() => onFund(creator)}
            className="w-full"
            icon={<Icon name="heart" size="sm" />}
          >
            Fund Creator
          </Button>
        )}
      </div>
    </div>
  );
}

// Funding Modal Component
type FundingModalProps = {
  creator: Creator | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (transaction: FundingTransaction) => void;
};

export function FundingModal({ creator, isOpen, onClose, onSuccess }: FundingModalProps) {
  const { address } = useAccount();
  const [amount, setAmount] = useState("0.001");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendNotification = useNotification();

  const calls = useMemo(() => {
    if (!address || !creator || !amount) return [];
    
    return [
      {
        to: creator.walletAddress as `0x${string}`,
        data: "0x" as `0x${string}`,
        value: BigInt(Math.floor(parseFloat(amount) * 1e18)),
      },
    ];
  }, [address, creator, amount]);

  const handleSuccess = useCallback(async (response: TransactionResponse) => {
    setIsLoading(false);
    const transactionHash = response.transactionReceipts[0].transactionHash;
    
    if (creator) {
      const fundingTransaction: FundingTransaction = {
        id: Date.now().toString(),
        from: address || "",
        to: creator.walletAddress,
        amount: parseFloat(amount),
        message: message || undefined,
        timestamp: Date.now(),
        txHash: transactionHash,
      };

      await sendNotification({
        title: "Funding Successful! 🎉",
        body: `You sent ${amount} ETH to ${creator.name}`,
      });

      onSuccess?.(fundingTransaction);
      onClose();
    }
  }, [address, creator, amount, message, sendNotification, onSuccess, onClose]);

  const handleError = useCallback((error: TransactionError) => {
    setIsLoading(false);
    console.error("Transaction failed:", error);
  }, []);

  if (!isOpen || !creator) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-black rounded-xl shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-[var(--app-foreground)]">
            Fund {creator.name}
          </h2>
          <button
            onClick={onClose}
            className="text-[var(--app-foreground-muted)] hover:text-[var(--app-foreground)]"
          >
            <Icon name="close" size="sm" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--app-foreground)] mb-2">
              Amount (ETH)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              step="0.001"
              min="0.001"
              className="w-full px-3 py-2 bg-[var(--app-background)] border border-[var(--app-card-border)] rounded-lg text-[var(--app-foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--app-accent)]"
              placeholder="0.001"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--app-foreground)] mb-2">
              Message (Optional)
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 bg-[var(--app-background)] border border-[var(--app-card-border)] rounded-lg text-[var(--app-foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--app-accent)] resize-none"
              placeholder="Leave a message for the creator..."
            />
          </div>

          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isLoading}
            >
              Cancel
            </Button>
            {address ? (
              <Transaction
                calls={calls}
                onSuccess={handleSuccess}
                onError={handleError}
              >
                <TransactionButton 
                  className="flex-1 text-white"
                  disabled={!amount || parseFloat(amount) <= 0}
                />
                <TransactionStatus>
                  <TransactionStatusAction />
                  <TransactionStatusLabel />
                </TransactionStatus>
                <TransactionToast className="mb-4">
                  <TransactionToastIcon />
                  <TransactionToastLabel />
                  <TransactionToastAction />
                </TransactionToast>
              </Transaction>
            ) : (
              <p className="text-yellow-400 text-sm text-center">
                Connect your wallet to fund
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Creator Discovery Component
type CreatorDiscoveryProps = {
  creators: Creator[];
  onFundCreator: (creator: Creator) => void;
  onSearch?: (searchTerm: string) => void;
  loading?: boolean;
  error?: string | null;
};

export function CreatorDiscovery({ creators, onFundCreator, onSearch, loading = false, error }: CreatorDiscoveryProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
    if (onSearch) {
      onSearch(term);
    }
  }, [onSearch]);

  const filteredCreators = useMemo(() => {
    if (!searchTerm) return creators;
    
    return creators.filter(creator =>
      creator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      creator.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      creator.bio?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [creators, searchTerm]);

  return (
    <div className="space-y-6">
      <div className="bg-[var(--app-card-bg)] backdrop-blur-md rounded-xl shadow-lg border border-[var(--app-card-border)] p-5">
        <h2 className="text-xl font-semibold text-[var(--app-foreground)] mb-4">
          Discover Creators
        </h2>
        
        <div className="relative mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search creators..."
            className="w-full px-4 py-2 pl-10 bg-[var(--app-background)] border border-[var(--app-card-border)] rounded-lg text-[var(--app-foreground)] placeholder-[var(--app-foreground-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--app-accent)]"
          />
          <Icon name="search" size="sm" className="absolute left-3 top-2.5 text-[var(--app-foreground-muted)]" />
        </div>

        {error && (
          <p className="text-red-400 text-sm mb-2">
            {error}
          </p>
        )}

        <p className="text-[var(--app-foreground-muted)] text-sm">
          {loading ? "Loading..." : `${filteredCreators.length} creator${filteredCreators.length !== 1 ? 's' : ''} found`}
        </p>
      </div>

      <div className="grid gap-4">
        {filteredCreators.map((creator) => (
          <CreatorProfile
            key={creator.id}
            creator={creator}
            onFund={onFundCreator}
          />
        ))}
      </div>
    </div>
  );
}

// Transaction History Component
type TransactionHistoryProps = {
  transactions: FundingTransaction[];
  className?: string;
};

export function TransactionHistory({ transactions, className = "" }: TransactionHistoryProps) {
  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`bg-[var(--app-card-bg)] backdrop-blur-md rounded-xl shadow-lg border border-[var(--app-card-border)] overflow-hidden ${className}`}>
      <div className="px-5 py-3 border-b border-[var(--app-card-border)]">
        <h3 className="text-lg font-medium text-[var(--app-foreground)]">
          Recent Transactions
        </h3>
      </div>
      <div className="p-5">
        {transactions.length === 0 ? (
          <p className="text-[var(--app-foreground-muted)] text-center py-4">
            No transactions yet
          </p>
        ) : (
          <div className="space-y-3">
            {transactions.slice(0, 5).map((tx) => (
              <div key={tx.id} className="flex items-center justify-between p-3 bg-[var(--app-background)] rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <Icon name="heart" size="sm" className="text-[var(--app-accent)]" />
                    <span className="text-sm font-medium text-[var(--app-foreground)]">
                      {tx.amount} ETH
                    </span>
                  </div>
                  {tx.message && (
                    <p className="text-xs text-[var(--app-foreground-muted)] mt-1">
                      "{tx.message}"
                    </p>
                  )}
                  <p className="text-xs text-[var(--app-foreground-muted)]">
                    {formatTime(tx.timestamp)}
                  </p>
                </div>
                <a
                  href={`https://basescan.org/tx/${tx.txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--app-accent)] hover:underline text-xs"
                >
                  View
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Share Link Component
type ShareLinkProps = {
  creator: Creator;
  className?: string;
};

export function ShareLink({ creator, className = "" }: ShareLinkProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl = `${window.location.origin}/fund/${creator.id}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className={`bg-[var(--app-card-bg)] backdrop-blur-md rounded-xl shadow-lg border border-[var(--app-card-border)] p-5 ${className}`}>
      <h3 className="text-lg font-medium text-[var(--app-foreground)] mb-3">
        Share Your Funding Link
      </h3>
      
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={shareUrl}
            readOnly
            className="flex-1 px-3 py-2 bg-[var(--app-background)] border border-[var(--app-card-border)] rounded-lg text-[var(--app-foreground)] text-sm"
          />
          <Button
            variant={copied ? "secondary" : "outline"}
            size="sm"
            onClick={copyToClipboard}
            icon={<Icon name={copied ? "check" : "copy"} size="sm" />}
          >
            {copied ? "Copied!" : "Copy"}
          </Button>
        </div>

        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(`https://twitter.com/intent/tweet?text=Support me on Funder! ${shareUrl}`, '_blank')}
            icon={<Icon name="twitter" size="sm" />}
          >
            Share on X
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(`https://www.youtube.com/watch?v=`, '_blank')}
            icon={<Icon name="youtube" size="sm" />}
          >
            Share on YouTube
          </Button>
        </div>
      </div>
    </div>
  );
}
