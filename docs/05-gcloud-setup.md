# Google Cloud Setup Guide

## What was built
A production-ready infrastructure on Google Cloud Platform (GCP) to host TravelSphere AI. This setup ensures high availability, security, and scalability with minimal management overhead.

### Key Infrastructure Components:
- **Cloud Run Service**: A managed compute platform for running the containerized Next.js app.
- **Artifact Registry**: A private repository to store Docker images.
- **Secret Manager**: Secure storage for sensitive keys (Gemini API, Firebase Private Key).
- **Service Account**: A dedicated identity with least-privilege access to Cloud Logging and Secret Manager.

## Why was it built this way
- **Serverless (Cloud Run)**: Pay only when the app is running. This is ideal for a hackathon project where traffic might be bursty.
- **Global Reach**: Deployed in `us-central1` for proximity to Gemini API endpoints and optimal latency.
- **Secret Separation**: Instead of baking `.env` files into the Docker image, we fetch secrets at runtime. This prevents credential leaks if the image is shared.

## How was it done (Step-by-Step)

### 1. Project Initialization
```bash
# Set your project ID
gcloud config set project [PROJECT_ID]

# Enable required APIs
gcloud services enable run.googleapis.com \
    artifactregistry.googleapis.com \
    secretmanager.googleapis.com
```

### 2. Artifact Registry Setup
```bash
# Create a repository for the Docker images
gcloud artifacts repositories create travelsphere-repo \
    --repository-format=docker \
    --location=us-central1
```

### 3. Secret Management
1.  Create secrets in the **Google Cloud Console** (Secret Manager):
    - `GEMINI_API_KEY`
    - `FIREBASE_PRIVATE_KEY` (Important: Wrap the multiline key in quotes)
2.  Grant the Cloud Run service account `Secret Manager Secret Accessor` permissions.

### 4. Containerization & Push
```bash
# Build the image locally (or via Cloud Build)
docker build -t us-central1-docker.pkg.dev/[PROJECT_ID]/travelsphere-repo/app:latest .

# Push to Artifact Registry
docker push us-central1-docker.pkg.dev/[PROJECT_ID]/travelsphere-repo/app:latest
```

### 5. Deployment to Cloud Run
```bash
gcloud run deploy travelsphere \
    --image us-central1-docker.pkg.dev/[PROJECT_ID]/travelsphere-repo/app:latest \
    --region us-central1 \
    --allow-unauthenticated \
    --set-secrets="GEMINI_API_KEY=GEMINI_API_KEY:latest,FIREBASE_PRIVATE_KEY=FIREBASE_PRIVATE_KEY:latest" \
    --memory 1Gi \
    --cpu 1
```

---
*Note: Ensure your `next.config.ts` has `output: 'standalone'` enabled for Cloud Run compatibility.*
