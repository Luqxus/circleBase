'use client';

import { useEffect } from 'react';

export function FarcasterSDKProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const url = new URL(window.location.href);
    const isMini =
      url.pathname.startsWith('/mini') ||
      url.searchParams.get('miniApp') === 'true';

    if (isMini) {
      import('@farcaster/miniapp-sdk').then(({ sdk }) => {
        // Mini-App–specific bootstrap here
        try {
          sdk.actions.ready();
          console.log('Farcaster SDK ready called successfully');
        } catch (error) {
          console.error('Error calling Farcaster SDK ready:', error);
        }
      });
    }
  }, []);

  return <>{children}</>;
}
