// Firebase Configuration Test
// Run this to check if your Firebase config is working

import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export function testFirebaseConfig() {
  console.log('Firebase Config Check:');
  console.log('API Key:', firebaseConfig.apiKey ? '✅ Set' : '❌ Missing');
  console.log('Auth Domain:', firebaseConfig.authDomain ? '✅ Set' : '❌ Missing');
  console.log('Project ID:', firebaseConfig.projectId ? '✅ Set' : '❌ Missing');
  console.log('Storage Bucket:', firebaseConfig.storageBucket ? '✅ Set' : '❌ Missing');
  console.log('Messaging Sender ID:', firebaseConfig.messagingSenderId ? '✅ Set' : '❌ Missing');
  console.log('App ID:', firebaseConfig.appId ? '✅ Set' : '❌ Missing');
  
  if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
    console.error('❌ Firebase configuration is incomplete!');
    return false;
  }
  
  try {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    console.log('✅ Firebase initialized successfully');
    return true;
  } catch (error) {
    console.error('❌ Firebase initialization failed:', error);
    return false;
  }
}

// Call this function to test
if (typeof window !== 'undefined') {
  testFirebaseConfig();
}
