"use client";

import { useState, useEffect } from 'react';
import { Button } from './DemoComponents';
import { Icon } from './DemoComponents';
import { CreatorService } from '../../lib/creatorService';

export function FirebaseDebug() {
  const [status, setStatus] = useState<'checking' | 'connected' | 'error' | 'fallback'>('checking');
  const [error, setError] = useState<string | null>(null);
  const [creatorsCount, setCreatorsCount] = useState<number>(0);

  const testFirebaseConnection = async () => {
    setStatus('checking');
    setError(null);
    
    try {
      console.log('🔍 Testing Firebase connection...');
      
      // Test environment variables
      const config = {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      };
      
      console.log('Firebase Config:', {
        apiKey: config.apiKey ? '✅ Set' : '❌ Missing',
        authDomain: config.authDomain ? '✅ Set' : '❌ Missing',
        projectId: config.projectId ? '✅ Set' : '❌ Missing',
        storageBucket: config.storageBucket ? '✅ Set' : '❌ Missing',
        messagingSenderId: config.messagingSenderId ? '✅ Set' : '❌ Missing',
        appId: config.appId ? '✅ Set' : '❌ Missing',
      });
      
      if (!config.apiKey || !config.projectId) {
        throw new Error('Firebase configuration is incomplete. Check your environment variables.');
      }
      
      // Test Firestore connection
      const creators = await CreatorService.getAllCreators();
      setCreatorsCount(creators.length);
      
      if (creators.length > 0 && creators[0].id.startsWith('local_')) {
        setStatus('fallback');
        setError('Using fallback data - Firebase connection failed');
      } else {
        setStatus('connected');
        console.log('✅ Firebase connection successful!');
      }
      
    } catch (err) {
      console.error('❌ Firebase connection failed:', err);
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  };

  useEffect(() => {
    testFirebaseConnection();
  }, []);

  const getStatusIcon = () => {
    switch (status) {
      case 'checking': return 'search';
      case 'connected': return 'check';
      case 'error': return 'close';
      case 'fallback': return 'star';
      default: return 'search';
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'checking': return 'text-yellow-400';
      case 'connected': return 'text-green-400';
      case 'error': return 'text-red-400';
      case 'fallback': return 'text-orange-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'checking': return 'Checking Firebase connection...';
      case 'connected': return 'Firebase connected successfully';
      case 'error': return 'Firebase connection failed';
      case 'fallback': return 'Using fallback data';
      default: return 'Unknown status';
    }
  };

  return (
    <div className="bg-[var(--app-card-bg)] backdrop-blur-md rounded-xl shadow-lg border border-[var(--app-card-border)] p-5">
      <h3 className="text-lg font-semibold text-[var(--app-foreground)] mb-4">
        Firebase Connection Status
      </h3>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <Icon 
            name={getStatusIcon()} 
            size="sm" 
            className={getStatusColor()} 
          />
          <span className={`text-sm font-medium ${getStatusColor()}`}>
            {getStatusText()}
          </span>
        </div>
        
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-600 text-sm">
              {error}
            </p>
          </div>
        )}
        
        <div className="text-sm text-[var(--app-foreground-muted)]">
          <p>Creators loaded: {creatorsCount}</p>
          <p>Environment: {process.env.NODE_ENV}</p>
          <p>Project ID: {process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'Not set'}</p>
          <p>Current domain: {typeof window !== 'undefined' ? window.location.hostname : 'server'}</p>
          <p>API Key: {process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? '✅ Set' : '❌ Missing'}</p>
        </div>
        
        {status === 'error' && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-yellow-800 text-sm font-medium mb-2">
              🔧 Quick Fix:
            </p>
            <p className="text-yellow-700 text-xs mb-2">
              1. Go to Firebase Console → Authentication → Settings → Authorized domains
            </p>
            <p className="text-yellow-700 text-xs mb-2">
              2. Add: <code className="bg-yellow-100 px-1 rounded">{typeof window !== 'undefined' ? window.location.hostname : 'your-domain'}</code>
            </p>
            <p className="text-yellow-700 text-xs">
              3. Refresh this page
            </p>
          </div>
        )}
        
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={testFirebaseConnection}
            icon={<Icon name="search" size="sm" />}
          >
            Test Connection
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={async () => {
              try {
                const testCreator = await CreatorService.createTestCreator();
                console.log('✅ Test creator created:', testCreator.id);
                alert(`Test creator created with ID: ${testCreator.id}`);
                testFirebaseConnection(); // Refresh the list
              } catch (error) {
                console.error('Failed to create test creator:', error);
                alert('Failed to create test creator');
              }
            }}
            icon={<Icon name="plus" size="sm" />}
          >
            Create Test Creator
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={async () => {
              try {
                await CreatorService.fixExistingCreators();
                alert('All existing creators have been fixed!');
                testFirebaseConnection(); // Refresh the list
              } catch (error) {
                console.error('Failed to fix creators:', error);
                alert('Failed to fix creators');
              }
            }}
            icon={<Icon name="search" size="sm" />}
          >
            Fix Existing Creators
          </Button>
        </div>
      </div>
    </div>
  );
}
