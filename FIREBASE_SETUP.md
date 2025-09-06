# Firebase Setup Guide for Funder App

This guide will help you set up Firebase for storing creator profile information and transaction data.

## What You Need to Provide

### 1. Firebase Project Configuration

You'll need to create a Firebase project and get the following configuration values:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
```

### 2. Steps to Get Firebase Configuration

1. **Go to Firebase Console**: https://console.firebase.google.com/
2. **Create a New Project**:
   - Click "Create a project"
   - Enter project name (e.g., "funder-app")
   - Enable Google Analytics (optional)
   - Click "Create project"

3. **Add Web App**:
   - Click the web icon (`</>`) to add a web app
   - Register your app with a nickname (e.g., "funder-web")
   - Copy the configuration object

4. **Enable Firestore Database**:
   - Go to "Firestore Database" in the left sidebar
   - Click "Create database"
   - Choose "Start in test mode" (for development)
   - Select a location for your database

5. **Set up Security Rules** (for production):
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       // Allow read access to creators collection
       match /creators/{document} {
         allow read: if true;
         allow write: if request.auth != null;
       }
       
       // Allow read/write access to transactions for authenticated users
       match /transactions/{document} {
         allow read, write: if request.auth != null;
       }
     }
   }
   ```

### 3. Environment Variables Setup

Add these variables to your `.env.local` file:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyC...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=funder-app.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=funder-app
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=funder-app.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef123456
```

### 4. Firestore Collections Structure

The app will create two main collections:

#### `creators` Collection
```javascript
{
  id: "auto-generated-id",
  name: "Creator Name",
  username: "creator_username",
  walletAddress: "0x...",
  bio: "Creator bio",
  avatar: "avatar_url",
  socialLinks: {
    twitter: "https://twitter.com/...",
    youtube: "https://youtube.com/...",
    instagram: "https://instagram.com/..."
  },
  totalFunds: 0,
  supporters: 0,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

#### `transactions` Collection
```javascript
{
  id: "auto-generated-id",
  from: "0x...", // Supporter wallet address
  to: "0x...",   // Creator wallet address
  amount: 0.001, // ETH amount
  message: "Optional message",
  timestamp: timestamp,
  txHash: "0x..." // Blockchain transaction hash
}
```

### 5. Firebase Features Used

- **Firestore Database**: For storing creator profiles and transaction data
- **Real-time Updates**: Automatic UI updates when data changes
- **Offline Support**: Works offline and syncs when connection is restored
- **Security Rules**: Control access to data based on authentication

### 6. Development vs Production

#### Development Mode
- Use test mode for Firestore (allows read/write access)
- No authentication required
- Good for testing and development

#### Production Mode
- Set up proper security rules
- Consider adding Firebase Authentication
- Enable billing for production usage
- Set up proper indexes for queries

### 7. Cost Considerations

Firebase Firestore pricing:
- **Free Tier**: 50,000 reads, 20,000 writes, 20,000 deletes per day
- **Paid Tier**: $0.06 per 100,000 reads, $0.18 per 100,000 writes
- **Storage**: $0.18 per GB per month

For a creator funding app, the free tier should be sufficient for initial development and testing.

### 8. Alternative: Local Development

If you want to test without Firebase initially, the app will fall back to local state management. However, for full functionality including:
- Persistent creator profiles
- Transaction history
- Real-time updates
- Cross-device synchronization

You'll need to set up Firebase as described above.

### 9. Troubleshooting

Common issues:
- **CORS errors**: Make sure your domain is added to Firebase authorized domains
- **Permission denied**: Check your Firestore security rules
- **Configuration errors**: Verify all environment variables are set correctly
- **Network errors**: Check your internet connection and Firebase project status

### 10. Next Steps

1. Set up Firebase project
2. Add environment variables
3. Test creator profile creation
4. Test transaction recording
5. Set up production security rules
6. Deploy with Firebase hosting (optional)

The app is now ready to use Firebase for persistent data storage!
