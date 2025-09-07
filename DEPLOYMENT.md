# Vercel Deployment Guide

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Push your code to GitHub
3. **Firebase Project**: Ensure your Firebase project is set up

## Environment Variables

You'll need to set these environment variables in Vercel:

### Required Firebase Variables:
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### Optional Variables:
```
NEXT_PUBLIC_USE_FIRESTORE_EMULATOR=false
```

## Deployment Steps

### 1. Push to GitHub
```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### 2. Deploy to Vercel

#### Option A: Vercel CLI
```bash
npm i -g vercel
vercel
```

#### Option B: Vercel Dashboard
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Configure environment variables
5. Deploy

### 3. Configure Environment Variables in Vercel

1. Go to your project dashboard
2. Click "Settings" → "Environment Variables"
3. Add each Firebase environment variable
4. Redeploy

### 4. Update Firebase Authorized Domains

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Go to Authentication → Settings → Authorized domains
4. Add your Vercel domain: `your-project.vercel.app`

## Post-Deployment Checklist

- [ ] Environment variables are set
- [ ] Firebase authorized domains include Vercel domain
- [ ] App loads without errors
- [ ] Firebase connection works
- [ ] Creator profiles can be created
- [ ] Funding functionality works
- [ ] Wallet connection works

## Troubleshooting

### Common Issues:

1. **Firebase Connection Errors**
   - Check environment variables
   - Verify authorized domains
   - Check Firebase project settings

2. **Build Errors**
   - Check for TypeScript errors
   - Verify all dependencies are installed
   - Check for syntax errors

3. **Runtime Errors**
   - Check browser console
   - Verify environment variables are public (NEXT_PUBLIC_*)
   - Check Firebase configuration

## Custom Domain (Optional)

1. Go to Vercel project settings
2. Click "Domains"
3. Add your custom domain
4. Update Firebase authorized domains with your custom domain

## Performance Optimization

- Enable Vercel Analytics
- Use Vercel Edge Functions if needed
- Optimize images with next/image
- Enable compression

## Security

- All environment variables are properly configured
- Firebase security rules are set up
- HTTPS is enabled by default on Vercel
- CORS is properly configured
