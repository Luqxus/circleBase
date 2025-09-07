'use client';

import { useEffect } from 'react';

export function FarcasterSDKProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Always try to initialize the Farcaster SDK when available
    import('@farcaster/miniapp-sdk').then(({ sdk }) => {
      try {
        sdk.actions.ready();
        console.log('Farcaster SDK ready called successfully');
      } catch (error) {
        console.error('Error calling Farcaster SDK ready:', error);
      }
    }).catch((error) => {
      // SDK not available, which is fine for non-mini-app contexts
      console.log('Farcaster SDK not available:', error.message);
    });
  }, []);

  return <>{children}</>;
}
