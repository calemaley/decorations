#!/bin/bash

echo "🚀 Deploying Mirie Decors to Fly.dev..."

# Set the DATABASE_URL secret
echo "📊 Setting up database connection..."
flyctl secrets set DATABASE_URL="postgresql://neondb_owner:npg_cYMgw6HLD3Th@ep-still-math-aele17t5-pooler.c-2.us-east-2.aws.neon.tech/neondb?channel_binding=require&sslmode=require"

# Deploy the application
echo "🌟 Deploying application..."
flyctl deploy

echo "✅ Deployment complete!"
echo "🌐 Your app should be available at: https://mirie-decors.fly.dev"
