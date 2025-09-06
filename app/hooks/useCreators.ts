"use client";

import { useState, useEffect, useCallback } from 'react';
import { CreatorService, TransactionService } from '../../lib/creatorService';
import { type Creator, type FundingTransaction } from '../components/FunderComponents';

export function useCreators() {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCreators = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedCreators = await CreatorService.getAllCreators();
      setCreators(fetchedCreators);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch creators');
      console.error('Error fetching creators:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const searchCreators = useCallback(async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      fetchCreators();
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const searchResults = await CreatorService.searchCreators(searchTerm);
      setCreators(searchResults);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search creators');
      console.error('Error searching creators:', err);
    } finally {
      setLoading(false);
    }
  }, [fetchCreators]);

  const getCreatorById = useCallback(async (creatorId: string): Promise<Creator | null> => {
    try {
      return await CreatorService.getCreatorById(creatorId);
    } catch (err) {
      console.error('Error getting creator by ID:', err);
      return null;
    }
  }, []);

  const getCreatorByWallet = useCallback(async (walletAddress: string): Promise<Creator | null> => {
    try {
      return await CreatorService.getCreatorByWallet(walletAddress);
    } catch (err) {
      console.error('Error getting creator by wallet:', err);
      return null;
    }
  }, []);

  const createCreator = useCallback(async (creatorData: Omit<Creator, 'id' | 'createdAt' | 'updatedAt'>): Promise<Creator | null> => {
    try {
      setError(null);
      const newCreator = await CreatorService.createCreator(creatorData);
      setCreators(prev => [newCreator, ...prev]);
      return newCreator;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create creator');
      console.error('Error creating creator:', err);
      return null;
    }
  }, []);

  const updateCreator = useCallback(async (creatorId: string, updateData: Partial<Omit<Creator, 'id' | 'createdAt' | 'updatedAt'>>): Promise<boolean> => {
    try {
      setError(null);
      await CreatorService.updateCreator(creatorId, updateData);
      setCreators(prev => prev.map(creator => 
        creator.id === creatorId 
          ? { ...creator, ...updateData, updatedAt: new Date() }
          : creator
      ));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update creator');
      console.error('Error updating creator:', err);
      return false;
    }
  }, []);

  const deleteCreator = useCallback(async (creatorId: string): Promise<boolean> => {
    try {
      setError(null);
      await CreatorService.deleteCreator(creatorId);
      setCreators(prev => prev.filter(creator => creator.id !== creatorId));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete creator');
      console.error('Error deleting creator:', err);
      return false;
    }
  }, []);

  useEffect(() => {
    fetchCreators();
  }, [fetchCreators]);

  return {
    creators,
    loading,
    error,
    fetchCreators,
    searchCreators,
    getCreatorById,
    getCreatorByWallet,
    createCreator,
    updateCreator,
    deleteCreator,
  };
}

export function useTransactions() {
  const [transactions, setTransactions] = useState<FundingTransaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createTransaction = useCallback(async (transactionData: Omit<FundingTransaction, 'id' | 'timestamp'>): Promise<FundingTransaction | null> => {
    try {
      setError(null);
      const newTransaction = await TransactionService.createTransaction(transactionData);
      setTransactions(prev => [newTransaction, ...prev]);
      return newTransaction;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create transaction');
      console.error('Error creating transaction:', err);
      return null;
    }
  }, []);

  const getCreatorTransactions = useCallback(async (creatorId: string): Promise<FundingTransaction[]> => {
    try {
      setLoading(true);
      setError(null);
      const creatorTransactions = await TransactionService.getCreatorTransactions(creatorId);
      return creatorTransactions;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch transactions');
      console.error('Error getting creator transactions:', err);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const getSupporterTransactions = useCallback(async (supporterAddress: string): Promise<FundingTransaction[]> => {
    try {
      setLoading(true);
      setError(null);
      const supporterTransactions = await TransactionService.getSupporterTransactions(supporterAddress);
      setTransactions(supporterTransactions);
      return supporterTransactions;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch transactions');
      console.error('Error getting supporter transactions:', err);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const getRecentTransactions = useCallback(async (limitCount: number = 20): Promise<FundingTransaction[]> => {
    try {
      setLoading(true);
      setError(null);
      const recentTransactions = await TransactionService.getRecentTransactions(limitCount);
      setTransactions(recentTransactions);
      return recentTransactions;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch recent transactions');
      console.error('Error getting recent transactions:', err);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    transactions,
    loading,
    error,
    createTransaction,
    getCreatorTransactions,
    getSupporterTransactions,
    getRecentTransactions,
  };
}
