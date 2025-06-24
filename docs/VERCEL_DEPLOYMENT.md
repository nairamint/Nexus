# Vercel Deployment Guide for SFDR Navigator Agent

## Overview

This guide provides instructions for deploying the SFDR Navigator Agent on Vercel. The project has been configured to work with Vercel's serverless functions architecture.

## Configuration Files

### vercel.json

The `vercel.json` file in the project root configures how Vercel builds and deploys the application:

```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": null,
  "functions": {
    "api/*.js": {
      "memory": 1024,
      "maxDuration": 10
    }
  },
  "env": {
    "NODE_ENV": "production",
    "NODE_OPTIONS": "--max-old-space-size=1024"
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" }
      ]
    }
  ]
}
```

### API Routes

The `/api` directory contains serverless functions that Vercel will deploy as API endpoints:

- `/api/classify.js` - Main classification endpoint
- `/api/health.js` - Health check endpoint

## Deployment Steps

1. **Connect to Vercel**

   ```bash
   npm install -g vercel
   vercel login
   ```

2. **Deploy to Vercel**

   ```bash
   vercel
   ```

3. **Set Environment Variables**

   Set the following environment variables in the Vercel dashboard:

   ```
   PHASE_2B_ENABLED=true
   PHASE_2B_VERSION=2.0.0
   NODE_ENV=production
   ```

   For sensitive variables like API keys and secrets, use the Vercel dashboard to add them securely.

## Troubleshooting

### Memory Limitations

Vercel serverless functions have memory limitations. If you encounter memory issues:

1. Optimize your models and code
2. Upgrade to a higher Vercel plan
3. Consider moving compute-intensive operations to a separate service

### Execution Time Limits

Vercel functions have execution time limits (10-60 seconds depending on your plan). For long-running operations:

1. Implement asynchronous processing with webhooks
2. Use background workers for intensive tasks
3. Consider a hybrid architecture with dedicated servers for heavy processing

### Husky Installation Errors

The `prepare` script in `package.json` has been modified to prevent Husky installation errors during deployment:

```json
"prepare": "husky install 2>/dev/null || true"
```

This ensures that if Husky installation fails (which is expected in the Vercel environment), the build process will continue.

## Monitoring

Use the `/api/health` endpoint to monitor the service status. You can set up uptime monitoring services to periodically check this endpoint.

## Scaling

Vercel automatically scales your application based on demand. However, be mindful of:

1. Serverless function cold starts
2. Rate limits on your plan
3. Memory and execution time constraints

For high-traffic applications, consider upgrading to a higher Vercel plan or implementing a hybrid architecture.