"use client";

import { useState, useCallback } from "react";
import { useAccount } from "wagmi";
import { Button } from "./DemoComponents";
import { Icon } from "./DemoComponents";
import { type Creator } from "./FunderComponents";

type CreatorSetupProps = {
  onProfileCreated?: (creator: Creator) => void;
  className?: string;
};

export function CreatorSetup({ onProfileCreated, className = "" }: CreatorSetupProps) {
  const { address } = useAccount();
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    bio: "",
    twitter: "",
    youtube: "",
    instagram: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCreateProfile = useCallback(async () => {
    if (!address || !formData.name || !formData.username) return;

    setIsCreating(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newCreator: Creator = {
      id: Date.now().toString(),
      name: formData.name,
      username: formData.username,
      walletAddress: address,
      bio: formData.bio || undefined,
      totalFunds: 0,
      supporters: 0,
      socialLinks: {
        twitter: formData.twitter || undefined,
        youtube: formData.youtube || undefined,
        instagram: formData.instagram || undefined,
      }
    };

    setIsCreating(false);
    onProfileCreated?.(newCreator);
  }, [address, formData, onProfileCreated]);

  const isFormValid = formData.name.trim() && formData.username.trim() && address;

  return (
    <div className={`bg-[var(--app-card-bg)] backdrop-blur-md rounded-xl shadow-lg border border-[var(--app-card-border)] p-5 ${className}`}>
      <div className="text-center mb-6">
        <Icon name="star" size="lg" className="text-[var(--app-accent)] mx-auto mb-3" />
        <h2 className="text-xl font-semibold text-[var(--app-foreground)] mb-2">
          Create Your Creator Profile
        </h2>
        <p className="text-[var(--app-foreground-muted)] text-sm">
          Set up your profile to start receiving funds from supporters
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[var(--app-foreground)] mb-2">
            Display Name *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="Your display name"
            className="w-full px-3 py-2 bg-[var(--app-background)] border border-[var(--app-card-border)] rounded-lg text-[var(--app-foreground)] placeholder-[var(--app-foreground-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--app-accent)]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--app-foreground)] mb-2">
            Username *
          </label>
          <input
            type="text"
            value={formData.username}
            onChange={(e) => handleInputChange("username", e.target.value)}
            placeholder="@your_username"
            className="w-full px-3 py-2 bg-[var(--app-background)] border border-[var(--app-card-border)] rounded-lg text-[var(--app-foreground)] placeholder-[var(--app-foreground-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--app-accent)]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--app-foreground)] mb-2">
            Bio
          </label>
          <textarea
            value={formData.bio}
            onChange={(e) => handleInputChange("bio", e.target.value)}
            rows={3}
            placeholder="Tell your supporters about yourself..."
            className="w-full px-3 py-2 bg-[var(--app-background)] border border-[var(--app-card-border)] rounded-lg text-[var(--app-foreground)] placeholder-[var(--app-foreground-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--app-accent)] resize-none"
          />
        </div>

        <div className="border-t border-[var(--app-card-border)] pt-4">
          <h3 className="text-sm font-medium text-[var(--app-foreground)] mb-3">
            Social Links (Optional)
          </h3>
          
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-[var(--app-foreground-muted)] mb-1">
                Twitter/X
              </label>
              <input
                type="url"
                value={formData.twitter}
                onChange={(e) => handleInputChange("twitter", e.target.value)}
                placeholder="https://twitter.com/your_handle"
                className="w-full px-3 py-2 bg-[var(--app-background)] border border-[var(--app-card-border)] rounded-lg text-[var(--app-foreground)] placeholder-[var(--app-foreground-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--app-accent)] text-sm"
              />
            </div>

            <div>
              <label className="block text-xs text-[var(--app-foreground-muted)] mb-1">
                YouTube
              </label>
              <input
                type="url"
                value={formData.youtube}
                onChange={(e) => handleInputChange("youtube", e.target.value)}
                placeholder="https://youtube.com/@your_channel"
                className="w-full px-3 py-2 bg-[var(--app-background)] border border-[var(--app-card-border)] rounded-lg text-[var(--app-foreground)] placeholder-[var(--app-foreground-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--app-accent)] text-sm"
              />
            </div>

            <div>
              <label className="block text-xs text-[var(--app-foreground-muted)] mb-1">
                Instagram
              </label>
              <input
                type="url"
                value={formData.instagram}
                onChange={(e) => handleInputChange("instagram", e.target.value)}
                placeholder="https://instagram.com/your_handle"
                className="w-full px-3 py-2 bg-[var(--app-background)] border border-[var(--app-card-border)] rounded-lg text-[var(--app-foreground)] placeholder-[var(--app-foreground-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--app-accent)] text-sm"
              />
            </div>
          </div>
        </div>

        <div className="bg-[var(--app-background)] rounded-lg p-3 border border-[var(--app-card-border)]">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="check" size="sm" className="text-[var(--app-accent)]" />
            <span className="text-sm font-medium text-[var(--app-foreground)]">
              Wallet Connected
            </span>
          </div>
          <p className="text-xs text-[var(--app-foreground-muted)]">
            Your wallet address will be used to receive funds: {address?.slice(0, 6)}...{address?.slice(-4)}
          </p>
        </div>

        <Button
          variant="primary"
          size="lg"
          onClick={handleCreateProfile}
          disabled={!isFormValid || isCreating}
          className="w-full"
          icon={isCreating ? undefined : <Icon name="star" size="sm" />}
        >
          {isCreating ? "Creating Profile..." : "Create Creator Profile"}
        </Button>

        {!address && (
          <p className="text-yellow-400 text-sm text-center">
            Please connect your wallet to create a creator profile
          </p>
        )}
      </div>
    </div>
  );
}

// Creator Profile Management Component
type CreatorProfileManagerProps = {
  creator: Creator | null;
  onUpdateProfile?: (creator: Creator) => void;
  className?: string;
};

export function CreatorProfileManager({ creator, onUpdateProfile, className = "" }: CreatorProfileManagerProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: creator?.name || "",
    bio: creator?.bio || "",
    twitter: creator?.socialLinks?.twitter || "",
    youtube: creator?.socialLinks?.youtube || "",
    instagram: creator?.socialLinks?.instagram || "",
  });

  const handleSave = useCallback(() => {
    if (!creator) return;

    const updatedCreator: Creator = {
      ...creator,
      name: editData.name,
      bio: editData.bio || undefined,
      socialLinks: {
        twitter: editData.twitter || undefined,
        youtube: editData.youtube || undefined,
        instagram: editData.instagram || undefined,
      }
    };

    onUpdateProfile?.(updatedCreator);
    setIsEditing(false);
  }, [creator, editData, onUpdateProfile]);

  if (!creator) {
    return (
      <div className={`bg-[var(--app-card-bg)] backdrop-blur-md rounded-xl shadow-lg border border-[var(--app-card-border)] p-5 text-center ${className}`}>
        <Icon name="star" size="lg" className="text-[var(--app-foreground-muted)] mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-[var(--app-foreground)] mb-2">
          No Creator Profile
        </h3>
        <p className="text-[var(--app-foreground-muted)] text-sm">
          You haven't created a creator profile yet.
        </p>
      </div>
    );
  }

  return (
    <div className={`bg-[var(--app-card-bg)] backdrop-blur-md rounded-xl shadow-lg border border-[var(--app-card-border)] p-5 ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-[var(--app-foreground)]">
          Your Creator Profile
        </h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsEditing(!isEditing)}
          icon={<Icon name={isEditing ? "check" : "plus"} size="sm" />}
        >
          {isEditing ? "Save" : "Edit"}
        </Button>
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--app-foreground)] mb-2">
              Display Name
            </label>
            <input
              type="text"
              value={editData.name}
              onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 bg-[var(--app-background)] border border-[var(--app-card-border)] rounded-lg text-[var(--app-foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--app-accent)]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--app-foreground)] mb-2">
              Bio
            </label>
            <textarea
              value={editData.bio}
              onChange={(e) => setEditData(prev => ({ ...prev, bio: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 bg-[var(--app-background)] border border-[var(--app-card-border)] rounded-lg text-[var(--app-foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--app-accent)] resize-none"
            />
          </div>

          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleSave}
              className="flex-1"
            >
              Save Changes
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-[var(--app-accent)] rounded-full flex items-center justify-center text-white font-bold">
              {creator.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-[var(--app-foreground)]">
                {creator.name}
              </h4>
              <p className="text-sm text-[var(--app-foreground-muted)]">
                @{creator.username}
              </p>
              {creator.bio && (
                <p className="text-sm text-[var(--app-foreground-muted)] mt-2">
                  {creator.bio}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-lg font-bold text-[var(--app-accent)]">
                {creator.totalFunds.toFixed(4)} ETH
              </p>
              <p className="text-xs text-[var(--app-foreground-muted)]">Total Raised</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-[var(--app-foreground)]">
                {creator.supporters}
              </p>
              <p className="text-xs text-[var(--app-foreground-muted)]">Supporters</p>
            </div>
          </div>

          {creator.socialLinks && (
            <div className="flex space-x-2">
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
        </div>
      )}
    </div>
  );
}
