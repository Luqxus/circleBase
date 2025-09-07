"use client";

import { sdk } from "@farcaster/frame-sdk";
import {
  useMiniKit,
  useAddFrame,
  useOpenUrl,
} from "@coinbase/onchainkit/minikit";
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
import { useEffect, useMemo, useState, useCallback } from "react";
import { useAccount } from "wagmi";
import { Button } from "./components/DemoComponents";
import { Icon } from "./components/DemoComponents";
import { 
  FundingModal, 
  CreatorDiscovery, 
  TransactionHistory, 
  ShareLink,
  type Creator,
  type FundingTransaction
} from "./components/FunderComponents";
import { CreatorSetup, CreatorProfileManager } from "./components/CreatorSetup";
import { LandingPage } from "./components/LandingPage";
import { FirebaseDebug } from "./components/FirebaseDebug";
import { useCreators, useTransactions } from "./hooks/useCreators";

export default function App() {
  const { setFrameReady, isFrameReady, context } = useMiniKit();
  const { address, isConnected } = useAccount();
  const [frameAdded, setFrameAdded] = useState(false);
  const [activeTab, setActiveTab] = useState("discover");
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);
  const [isFundingModalOpen, setIsFundingModalOpen] = useState(false);
  const [userCreatorProfile, setUserCreatorProfile] = useState<Creator | null>(null);
  const [showCreatorSetup, setShowCreatorSetup] = useState(false);

  const addFrame = useAddFrame();
  const openUrl = useOpenUrl();

  

  // For example in React:
  useEffect(() => {
    sdk.actions.ready();
  }, []);

  // Firebase hooks
  const { 
    creators, 
    loading: creatorsLoading, 
    error: creatorsError,
    searchCreators,
    getCreatorByWallet,
    createCreator,
    updateCreator
  } = useCreators();
  
  const { 
    transactions, 
    createTransaction
  } = useTransactions();

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  // Load user's creator profile when wallet connects
  useEffect(() => {
    const loadUserProfile = async () => {
      if (address && isConnected) {
        try {
          const profile = await getCreatorByWallet(address);
          setUserCreatorProfile(profile);
        } catch (error) {
          console.error('Error loading user profile:', error);
        }
      }
    };

    loadUserProfile();
  }, [address, isConnected, getCreatorByWallet]);

  const handleAddFrame = useCallback(async () => {
    const frameAdded = await addFrame();
    setFrameAdded(Boolean(frameAdded));
  }, [addFrame]);

  const handleFundCreator = useCallback((creator: Creator) => {
    setSelectedCreator(creator);
    setIsFundingModalOpen(true);
  }, []);

  const handleFundingSuccess = useCallback(async (transaction: FundingTransaction) => {
    try {
      // Save transaction to Firebase
      await createTransaction(transaction);
      
      // Update creator stats in Firebase
      if (selectedCreator) {
        await updateCreator(selectedCreator.id, {
          totalFunds: selectedCreator.totalFunds + transaction.amount,
          supporters: selectedCreator.supporters + 1
        });
      }
    } catch (error) {
      console.error('Error saving transaction:', error);
    }
  }, [createTransaction, updateCreator, selectedCreator]);

  const handleCreatorProfileCreated = useCallback(async (creatorData: Omit<Creator, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newCreator = await createCreator(creatorData);
      if (newCreator) {
        setUserCreatorProfile(newCreator);
        setShowCreatorSetup(false);
      }
    } catch (error) {
      console.error('Error creating creator profile:', error);
    }
  }, [createCreator]);

  const handleUpdateCreatorProfile = useCallback(async (creatorId: string, updateData: Partial<Omit<Creator, 'id' | 'createdAt' | 'updatedAt'>>) => {
    try {
      const success = await updateCreator(creatorId, updateData);
      if (success && userCreatorProfile) {
        setUserCreatorProfile({
          ...userCreatorProfile,
          ...updateData,
          updatedAt: new Date()
        });
      }
    } catch (error) {
      console.error('Error updating creator profile:', error);
    }
  }, [updateCreator, userCreatorProfile]);

  const handleConnectWallet = useCallback(() => {
    // This will trigger the wallet connection through the ConnectWallet component
    // The actual connection is handled by the OnchainKit wallet components
  }, []);

  const saveFrameButton = useMemo(() => {
    if (context && !context.client.added) {
      return (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleAddFrame}
          className="text-[var(--app-accent)] p-4"
          icon={<Icon name="plus" size="sm" />}
        >
          Save Frame
        </Button>
      );
    }

    if (frameAdded) {
      return (
        <div className="flex items-center space-x-1 text-sm font-medium text-[#0052FF] animate-fade-out">
          <Icon name="check" size="sm" className="text-[#0052FF]" />
          <span>Saved</span>
        </div>
      );
    }

    return null;
  }, [context, frameAdded, handleAddFrame]);

  // Show landing page if not connected
  if (!isConnected) {
    return (
      <div className="flex flex-col min-h-screen font-sans text-[var(--app-foreground)] mini-app-theme from-[var(--app-background)] to-[var(--app-gray)]">
        <div className="w-full max-w-md mx-auto px-4 py-3">
          <header className="flex justify-between items-center mb-3 h-11">
            <div>
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
            </div>
            <div>{saveFrameButton}</div>
          </header>
          
          <LandingPage onConnectWallet={handleConnectWallet} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen font-sans text-[var(--app-foreground)] mini-app-theme from-[var(--app-background)] to-[var(--app-gray)]">
      <div className="w-full max-w-md mx-auto px-4 py-3">
        <header className="flex justify-between items-center mb-3 h-11">
          <div>
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
          </div>
          <div>{saveFrameButton}</div>
        </header>

        <main className="flex-1">
          {/* Navigation Tabs */}
          <div className="flex space-x-1 mb-4 bg-[var(--app-card-bg)] rounded-lg p-1">
            <button
              onClick={() => setActiveTab("discover")}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                activeTab === "discover"
                  ? "bg-[var(--app-accent)] text-[var(--app-background)]"
                  : "text-[var(--app-foreground-muted)] hover:text-[var(--app-foreground)]"
              }`}
            >
              Discover
            </button>
            <button
              onClick={() => setActiveTab("my-profile")}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                activeTab === "my-profile"
                  ? "bg-[var(--app-accent)] text-[var(--app-background)]"
                  : "text-[var(--app-foreground-muted)] hover:text-[var(--app-foreground)]"
              }`}
            >
              My Profile
            </button>
            <button
              onClick={() => setActiveTab("activity")}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                activeTab === "activity"
                  ? "bg-[var(--app-accent)] text-[var(--app-background)]"
                  : "text-[var(--app-foreground-muted)] hover:text-[var(--app-foreground)]"
              }`}
            >
              Activity
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "discover" && (
            <CreatorDiscovery 
              creators={creators} 
              onFundCreator={handleFundCreator}
              onSearch={searchCreators}
              loading={creatorsLoading}
              error={creatorsError}
            />
          )}
          
          {activeTab === "my-profile" && (
            <div className="space-y-6">
              {showCreatorSetup ? (
                <CreatorSetup
                  onProfileCreated={handleCreatorProfileCreated}
                  className="animate-fade-in"
                />
              ) : userCreatorProfile ? (
                <>
                  <CreatorProfileManager
                    creator={userCreatorProfile}
                    onUpdateProfile={(updateData) => handleUpdateCreatorProfile(userCreatorProfile.id, updateData)}
                    className="animate-fade-in"
                  />
                  
                  <ShareLink 
                    creator={userCreatorProfile}
                    className="animate-fade-in"
                  />
                </>
              ) : (
                <div className="bg-[var(--app-card-bg)] backdrop-blur-md rounded-xl shadow-lg border border-[var(--app-card-border)] p-5">
                  <div className="text-center">
                    <Icon name="star" size="lg" className="text-[var(--app-accent)] mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-[var(--app-foreground)] mb-4">
                      Creator Dashboard
                    </h2>
                    <p className="text-[var(--app-foreground-muted)] mb-6">
                      Set up your creator profile to start receiving funds from your supporters.
                    </p>
                    <Button
                      variant="primary"
                      size="lg"
                      className="w-full"
                      onClick={() => setShowCreatorSetup(true)}
                      icon={<Icon name="plus" size="sm" />}
                    >
                      Create Creator Profile
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {activeTab === "activity" && (
            <div className="space-y-6">
              <FirebaseDebug />
              <TransactionHistory 
                transactions={transactions}
                className="animate-fade-in"
              />
            </div>
          )}
        </main>

        <footer className="mt-2 pt-4 flex justify-center">
          <Button
            variant="ghost"
            size="sm"
            className="text-[var(--ock-text-foreground-muted)] text-xs"
            onClick={() => openUrl("https://base.org/builders/minikit")}
          >
            Built on Base with MiniKit
          </Button>
        </footer>
      </div>

      {/* Funding Modal */}
      <FundingModal
        creator={selectedCreator}
        isOpen={isFundingModalOpen}
        onClose={() => {
          setIsFundingModalOpen(false);
          setSelectedCreator(null);
        }}
        onSuccess={handleFundingSuccess}
      />
    </div>
  );
}
