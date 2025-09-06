import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Validate configuration
if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  console.error('❌ Firebase configuration is incomplete!');
  console.error('Missing required environment variables:');
  if (!firebaseConfig.apiKey) console.error('- NEXT_PUBLIC_FIREBASE_API_KEY');
  if (!firebaseConfig.projectId) console.error('- NEXT_PUBLIC_FIREBASE_PROJECT_ID');
}

// Initialize Firebase
let app;
let db;
let auth;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  auth = getAuth(app);
  
  // Connect to Firestore emulator in development if needed
  if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_FIRESTORE_EMULATOR === 'true') {
    try {
      connectFirestoreEmulator(db, 'localhost', 8080);
      console.log('🔧 Connected to Firestore emulator');
    } catch (error) {
      console.log('ℹ️ Firestore emulator not available, using production');
    }
  }
  
  console.log('✅ Firebase initialized successfully');
  console.log('🔍 Project ID:', firebaseConfig.projectId);
  console.log('🌐 Current domain:', typeof window !== 'undefined' ? window.location.hostname : 'server');
} catch (error) {
  console.error('❌ Firebase initialization failed:', error);
  throw error;
}

export { db, auth };
export default app;
