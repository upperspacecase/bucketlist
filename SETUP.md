# Bucket List App - Setup Guide

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

### Required Variables

```bash
# NextAuth Configuration
# Generate a random secret: openssl rand -base64 32
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# MongoDB Database
# Get your connection string from MongoDB Atlas: https://www.mongodb.com/cloud/atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
```

### Optional Variables (for additional features)

```bash
# Stripe Payment Configuration (only if using payments)
# Get your keys from: https://dashboard.stripe.com/apikeys
STRIPE_PUBLIC_KEY=pk_test_your_public_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Google OAuth (for Google sign-in)
# Get credentials from: https://console.cloud.google.com/apis/credentials
GOOGLE_ID=your-google-client-id
GOOGLE_SECRET=your-google-client-secret

# Resend Email (for email authentication)
# Get API key from: https://resend.com/api-keys
RESEND_API_KEY=re_your_api_key_here
```

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set up Environment Variables**
   - Copy the variables above into a `.env.local` file
   - Fill in your actual values

3. **Set up MongoDB**
   - Create a MongoDB Atlas account (free tier available)
   - Create a new cluster
   - Get your connection string and add it to `MONGODB_URI`

4. **Run the Development Server**
   ```bash
   npm run dev
   ```

5. **Open the App**
   - Navigate to `http://localhost:3000`
   - Sign in with Google or Email to get started

## Features

- ✅ User-specific bucket lists
- ✅ Add, complete, and delete items
- ✅ Progress tracking
- ✅ Feed of completed items from all users
- ✅ Shared lists for collaboration
- ✅ Authentication with NextAuth

## Database Schema

### Experience Model
- `userId`: Links items to users (required)
- `title`: Item title (required)
- `completed`: Completion status
- `category`: Item category
- `addedBy`: Name of user who added it

### SharedList Model
- `name`: List name
- `createdBy`: User ID of creator
- `participants`: Array of user IDs
- `items`: Array of list items

## API Endpoints

- `GET /api/experiences` - Get user's bucket list items
- `POST /api/experiences` - Add new item
- `PATCH /api/experiences` - Update item (e.g., mark complete)
- `DELETE /api/experiences` - Delete item
- `GET /api/feed` - Get feed of completed items
- `GET /api/shared-lists` - Get user's shared lists
- `POST /api/shared-lists` - Create new shared list
- `POST /api/shared-lists/items` - Add item to shared list
- `PATCH /api/shared-lists/items` - Update item in shared list

## Troubleshooting

### MongoDB Connection Issues
- Verify your `MONGODB_URI` is correct
- Check that your IP is whitelisted in MongoDB Atlas
- Ensure your MongoDB cluster is running

### Authentication Issues
- Verify `NEXTAUTH_SECRET` is set
- Check `NEXTAUTH_URL` matches your app URL
- For Google OAuth, ensure redirect URIs are configured

### Build Errors
- Run `npm install` to ensure all dependencies are installed
- Check that all environment variables are set
- Clear `.next` folder and rebuild: `rm -rf .next && npm run build`
