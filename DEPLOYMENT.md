# GCP Cloud Run Deployment Guide

## Prerequisites

1. **GCP Project Setup**
   - Go to [GCP Console](https://console.cloud.google.com)
   - Select your project: `gen-lang-client-0898802422`
   - Ensure Cloud Run API is enabled
   - Set up Cloud Build for your repository

2. **Required Environment Variables** (set in Cloud Run service)
   ```
   MONGO_URL=<your-mongodb-connection-string>
   DB_NAME=aurvyz
   GEMINI_API_KEY=<your-gemini-api-key>
   GEMINI_MODEL=gemini-1.5-flash
   NOTIFY_EMAIL=hello@aurvyz.com
   SMTP_HOST=smtp.zoho.in
   SMTP_PORT=465
   SMTP_USER=hello@aurvyz.com
   SMTP_PASS=JnNbDhY7HEyr
   ```

## Deployment Steps

### 1. Connect Your Repository
The repo autopush feature should automatically trigger builds when you push to your repository.

### 2. Manual Deployment (if needed)
```bash
cd aurvyz

# Deploy directly with gcloud
gcloud run deploy aurvyz \
  --source . \
  --region europe-west1 \
  --allow-unauthenticated \
  --memory 512Mi \
  --cpu 1 \
  --timeout 300 \
  --set-env-vars "MONGO_URL=$MONGO_URL,DB_NAME=aurvyz,GEMINI_API_KEY=$GEMINI_API_KEY,GEMINI_MODEL=gemini-2.5-flash,RESEND_API_KEY=$RESEND_API_KEY,SENDER_EMAIL=$SENDER_EMAIL,NOTIFY_EMAIL=$NOTIFY_EMAIL"
```

### 3. Monitor Deployment
1. Check [Cloud Run Console](https://console.cloud.google.com/run)
2. Select region: `europe-west1`
3. Click on `aurvyz` service
4. View deployment history and logs

### 4. Troubleshooting Build Failures
- **Check Build Logs**: Click "Build History" → View logs for the failed build
- **Common Issues**:
  - Missing environment variables: Set them in Cloud Run service settings
  - Missing MongoDB: Ensure MONGO_URL is set to a reachable MongoDB instance
  - Dependency conflicts: Check `backend/requirements.txt` for version issues
  - Missing secrets: Some environment variables are required

### 5. View Application Logs
```bash
gcloud run logs read aurvyz --region europe-west1 --limit 50
```

## Files Created

- **Dockerfile**: Containerizes the FastAPI backend
- **cloudbuild.yaml**: Defines the build and deployment pipeline
- **.dockerignore**: Specifies files to exclude from Docker build context
- **.gcloudignore**: Specifies files to exclude from Cloud Build context

## Architecture

```
┌─────────────────────┐
│   GitHub Repo       │
│  (with autopush)    │
└──────────┬──────────┘
           │ (push detected)
           ▼
┌─────────────────────┐
│   Cloud Build       │
│  (cloudbuild.yaml)  │
└──────────┬──────────┘
           │ (build succeeds)
           ▼
┌─────────────────────┐
│ Container Registry  │
│  (gcr.io/...)       │
└──────────┬──────────┘
           │ (push to registry)
           ▼
┌─────────────────────┐
│   Cloud Run         │
│  (europe-west1)     │
│  (aurvyz service)   │
└─────────────────────┘
           │
           ▼
https://aurvyz-145662328298.europe-west1.run.app/
```

## Next Steps

1. Ensure all environment variables are set in Cloud Run service settings
2. Push a commit to trigger the build
3. Monitor the build in Cloud Build
4. Check Cloud Run logs for any runtime errors
