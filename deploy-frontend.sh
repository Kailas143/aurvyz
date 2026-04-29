#!/bin/bash
# Deploy frontend to Cloud Run

PROJECT_ID="gen-lang-client-0898802422"
SERVICE_NAME="aurvyz-frontend"
REGION="europe-west1"

echo "Deploying frontend to Cloud Run..."

# Build using gcloud directly from source
gcloud run deploy $SERVICE_NAME \
  --source . \
  --region $REGION \
  --platform managed \
  --allow-unauthenticated \
  --memory 256Mi \
  --cpu 1 \
  --timeout 300 \
  --max-instances 10 \
  --project $PROJECT_ID \
  --build-config-file cloudbuild.frontend.yaml \
  --quiet

if [ $? -eq 0 ]; then
  echo "✅ Frontend deployed successfully!"
  gcloud run services describe $SERVICE_NAME --region $REGION --project $PROJECT_ID --format='value(status.url)'
else
  echo "❌ Frontend deployment failed"
  exit 1
fi
