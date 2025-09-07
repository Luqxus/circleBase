import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  serverTimestamp
} from 'firebase/firestore';
import { db } from './firebase';
import { type Creator, type FundingTransaction } from '../app/components/FunderComponents';

const CREATORS_COLLECTION = 'creators';
const TRANSACTIONS_COLLECTION = 'transactions';

// Fallback sample data for when Firebase is not available
const FALLBACK_CREATORS: Creator[] = [
  {
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
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
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
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
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
    },
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Creator Service Functions
export class CreatorService {
  // Get all creators
  static async getAllCreators(): Promise<Creator[]> {
    try {
      const creatorsRef = collection(db, CREATORS_COLLECTION);
      const q = query(creatorsRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      console.log('🔄 Total creators in database:', querySnapshot.docs.length);
      querySnapshot.docs.forEach(doc => {
        console.log('🔄 Creator ID:', doc.id, 'Name:', doc.data().name);
      });
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate?.() || new Date(),
      })) as Creator[];
    } catch (error) {
      console.error('Error getting creators from Firebase:', error);
      console.log('🔄 Falling back to sample data');
      return FALLBACK_CREATORS;
    }
  }

  // Get creator by ID
  static async getCreatorById(creatorId: string): Promise<Creator | null> {
    try {
      // First try to get by document ID (for backward compatibility)
      const creatorRef = doc(db, CREATORS_COLLECTION, creatorId);
      const creatorSnap = await getDoc(creatorRef);

      console.log('🔄 Creator snap:', creatorSnap);
      
      if (creatorSnap.exists()) {
        console.log('🔄 Creator found by document ID:', creatorSnap.id);
        const data = creatorSnap.data();
        console.log('🔄 Creator data:', data);
        return {
          id: creatorSnap.id,
          ...data,
          createdAt: data.createdAt?.toDate?.() || new Date(),
          updatedAt: data.updatedAt?.toDate?.() || new Date(),
        } as Creator;
      }

      // If not found by document ID, search by the 'id' field
      console.log('🔄 Creator not found by document ID, searching by id field:', creatorId);
      const creatorsRef = collection(db, CREATORS_COLLECTION);
      const q = query(creatorsRef, where('id', '==', creatorId));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        console.log('🔄 Creator found by id field:', doc.id);
        const data = doc.data();
        return {
          id: doc.id, // Use the actual document ID
          ...data,
          createdAt: data.createdAt?.toDate?.() || new Date(),
          updatedAt: data.updatedAt?.toDate?.() || new Date(),
        } as Creator;
      }

      console.log('🔄 Creator not found by id field either:', creatorId);
      return null;
    } catch (error) {
      console.error('Error getting creator from Firebase:', error);
      console.log('🔄 Falling back to sample data');
      
      // First try to find in fallback data
      const fallbackCreator = FALLBACK_CREATORS.find(creator => creator.id === creatorId);
      if (fallbackCreator) {
        return fallbackCreator;
      }
      
      // If not found and ID looks like a timestamp (local creator), create a generic creator
      if (creatorId.match(/^\d{13}$/) || creatorId.startsWith('local_')) {
        console.log('🔄 Creating fallback creator for ID:', creatorId);
        return {
          id: creatorId,
          name: "Creator",
          username: "creator",
          walletAddress: "0x0000000000000000000000000000000000000000",
          bio: "This creator profile is temporarily unavailable. Please try again later.",
          totalFunds: 0,
          supporters: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      }
      
      return null;
    }
  }

  // Get creator by wallet address
  static async getCreatorByWallet(walletAddress: string): Promise<Creator | null> {
    try {
      const creatorsRef = collection(db, CREATORS_COLLECTION);
      const q = query(creatorsRef, where('walletAddress', '==', walletAddress));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate?.() || new Date(),
          updatedAt: data.updatedAt?.toDate?.() || new Date(),
        } as Creator;
      }
      return null;
    } catch (error) {
      console.error('Error getting creator by wallet:', error);
      throw new Error('Failed to fetch creator by wallet');
    }
  }

  // Create new creator
  static async createCreator(creatorData: Omit<Creator, 'id' | 'createdAt' | 'updatedAt'>): Promise<Creator> {
    try {
      const creatorsRef = collection(db, CREATORS_COLLECTION);
      const docRef = await addDoc(creatorsRef, {
        ...creatorData,
        totalFunds: 0,
        supporters: 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      
      // Update the document to include the document ID as the id field
      await updateDoc(docRef, {
        id: docRef.id,
      });
      
      return {
        id: docRef.id,
        ...creatorData,
        totalFunds: 0,
        supporters: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    } catch (error) {
      console.error('Error creating creator in Firebase:', error);
      console.log('🔄 Creating creator locally (will not persist)');
      
      // Fallback: create locally without persisting
      const newCreator: Creator = {
        id: `local_${Date.now()}`,
        ...creatorData,
        totalFunds: 0,
        supporters: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      return newCreator;
    }
  }

  // Update creator
  static async updateCreator(creatorId: string, updateData: Partial<Omit<Creator, 'id' | 'createdAt' | 'updatedAt'>>): Promise<void> {
    try {
      const creatorRef = doc(db, CREATORS_COLLECTION, creatorId);
      await updateDoc(creatorRef, {
        ...updateData,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error updating creator:', error);
      throw new Error('Failed to update creator');
    }
  }

  // Delete creator
  static async deleteCreator(creatorId: string): Promise<void> {
    try {
      const creatorRef = doc(db, CREATORS_COLLECTION, creatorId);
      await deleteDoc(creatorRef);
    } catch (error) {
      console.error('Error deleting creator:', error);
      throw new Error('Failed to delete creator');
    }
  }

  // Search creators
  static async searchCreators(searchTerm: string): Promise<Creator[]> {
    try {
      const creatorsRef = collection(db, CREATORS_COLLECTION);
      const q = query(
        creatorsRef,
        where('name', '>=', searchTerm),
        where('name', '<=', searchTerm + '\uf8ff'),
        orderBy('name'),
        limit(20)
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate?.() || new Date(),
      })) as Creator[];
    } catch (error) {
      console.error('Error searching creators:', error);
      // Fallback to client-side search if Firestore query fails
      const allCreators = await this.getAllCreators();
      return allCreators.filter(creator =>
        creator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        creator.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        creator.bio?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }

  // Update creator stats after funding
  static async updateCreatorStats(creatorId: string, amount: number): Promise<void> {
    try {
      const creatorRef = doc(db, CREATORS_COLLECTION, creatorId);
      const creatorSnap = await getDoc(creatorRef);
      
      if (creatorSnap.exists()) {
        const currentData = creatorSnap.data();
        const newTotalFunds = (currentData.totalFunds || 0) + amount;
        const newSupporters = (currentData.supporters || 0) + 1;
        
        await updateDoc(creatorRef, {
          totalFunds: newTotalFunds,
          supporters: newSupporters,
          updatedAt: serverTimestamp(),
        });
      }
    } catch (error) {
      console.error('Error updating creator stats:', error);
      throw new Error('Failed to update creator stats');
    }
  }

  // Debug function to create a test creator
  static async createTestCreator(): Promise<Creator> {
    try {
      const testCreatorData = {
        name: "Test Creator",
        username: "test_creator",
        walletAddress: "0x1234567890123456789012345678901234567890",
        bio: "This is a test creator created to verify Firebase connection",
        totalFunds: 0,
        supporters: 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      const creatorsRef = collection(db, CREATORS_COLLECTION);
      const docRef = await addDoc(creatorsRef, testCreatorData);
      
      // Update the document to include the document ID as the id field
      await updateDoc(docRef, {
        id: docRef.id,
      });
      
      console.log('✅ Test creator created with ID:', docRef.id);
      
      return {
        id: docRef.id,
        ...testCreatorData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    } catch (error) {
      console.error('Error creating test creator:', error);
      throw new Error('Failed to create test creator');
    }
  }

  // Fix existing creators by adding the id field
  static async fixExistingCreators(): Promise<void> {
    try {
      const creatorsRef = collection(db, CREATORS_COLLECTION);
      const querySnapshot = await getDocs(creatorsRef);
      
      console.log('🔄 Found', querySnapshot.docs.length, 'creators to fix');
      
      for (const doc of querySnapshot.docs) {
        const data = doc.data();
        if (!data.id || data.id !== doc.id) {
          console.log('🔄 Fixing creator:', doc.id, 'Current id field:', data.id);
          await updateDoc(doc.ref, {
            id: doc.id,
          });
          console.log('✅ Fixed creator:', doc.id);
        }
      }
      
      console.log('✅ All creators fixed');
    } catch (error) {
      console.error('Error fixing creators:', error);
      throw new Error('Failed to fix creators');
    }
  }
}

// Transaction Service Functions
export class TransactionService {
  // Create new transaction
  static async createTransaction(transactionData: Omit<FundingTransaction, 'id' | 'timestamp'>): Promise<FundingTransaction> {
    try {
      const transactionsRef = collection(db, TRANSACTIONS_COLLECTION);
      const docRef = await addDoc(transactionsRef, {
        ...transactionData,
        timestamp: serverTimestamp(),
      });
      
      return {
        id: docRef.id,
        ...transactionData,
        timestamp: Date.now(),
      };
    } catch (error) {
      console.error('Error creating transaction:', error);
      throw new Error('Failed to create transaction');
    }
  }

  // Get transactions for a creator
  static async getCreatorTransactions(creatorId: string): Promise<FundingTransaction[]> {
    try {
      const transactionsRef = collection(db, TRANSACTIONS_COLLECTION);
      const q = query(
        transactionsRef,
        where('to', '==', creatorId),
        orderBy('timestamp', 'desc'),
        limit(50)
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          timestamp: data.timestamp?.toDate?.()?.getTime() || Date.now(),
        } as FundingTransaction;
      });
    } catch (error) {
      console.error('Error getting creator transactions:', error);
      throw new Error('Failed to fetch transactions');
    }
  }

  // Get transactions for a supporter
  static async getSupporterTransactions(supporterAddress: string): Promise<FundingTransaction[]> {
    try {
      const transactionsRef = collection(db, TRANSACTIONS_COLLECTION);
      const q = query(
        transactionsRef,
        where('from', '==', supporterAddress),
        orderBy('timestamp', 'desc'),
        limit(50)
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          timestamp: data.timestamp?.toDate?.()?.getTime() || Date.now(),
        } as FundingTransaction;
      });
    } catch (error) {
      console.error('Error getting supporter transactions:', error);
      throw new Error('Failed to fetch transactions');
    }
  }

  // Get all recent transactions
  static async getRecentTransactions(limitCount: number = 20): Promise<FundingTransaction[]> {
    try {
      const transactionsRef = collection(db, TRANSACTIONS_COLLECTION);
      const q = query(
        transactionsRef,
        orderBy('timestamp', 'desc'),
        limit(limitCount)
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          timestamp: data.timestamp?.toDate?.()?.getTime() || Date.now(),
        } as FundingTransaction;
      });
    } catch (error) {
      console.error('Error getting recent transactions:', error);
      throw new Error('Failed to fetch recent transactions');
    }
  }
}
