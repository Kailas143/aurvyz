# Aurvyz: Engineering Operational Systems

Aurvyz specializes in designing and engineering AI-powered operational systems that automate workflows, reduce manual work, and deliver high-performance interactive prototypes.

---

## 📂 Project: Aurvyz Outreach Automation Platform

The **Aurvyz Outreach Automation Platform** is a production-ready system designed to scale personalized outreach while maintaining a human touch. It combines advanced AI personalization with a robust, concurrent backend architecture.

### 🚀 Key Features
*   **Step-Based Progression**: Build complex outreach funnels with unlimited steps (Intro ➔ Value Add ➔ Re-engagement).
*   **Precision Delay Logic**: Define custom intervals between steps (e.g., "Wait 3 business days before Step 2").
*   **Intelligent "Stop-on-Reply"**: Automatically halts future steps for a lead once a response is detected.
*   **Smart Send Windows**: Define precise operating hours (e.g., 9 AM – 5 PM) to ensure outreach hits inboxes at peak activity.
*   **Gemini 2.5 Flash Integration**: Leverages the latest LLM models to generate hyper-personalized intro lines that feel genuinely human.

### 🏗️ Technical Architecture
*   **API Core**: Built with **FastAPI** for high-speed, non-blocking performance.
*   **Task Orchestration**: Distributed task management using **Celery + Redis**.
*   **Infrastructure**: Deployed as independent, horizontally scalable services in **Google Cloud Run**.
*   **Real-Time Processing**: Webhook engine for instant sentiment classification the second a lead responds.

---

## 🛠️ Development Setup

### Backend (FastAPI)
1.  **Navigate to the backend directory**:
    ```bash
    cd backend
    ```
2.  **Install dependencies**:
    ```bash
    pip install -r requirements.txt
    ```
3.  **Run the development server**:
    ```bash
    uvicorn server:app --reload --port 8000
    ```

### Frontend (React)
1.  **Navigate to the frontend directory**:
    ```bash
    cd frontend
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Start the development server**:
    ```bash
    npm start
    ```

---

## 🔑 Configuration (Environment Variables)

Configure your `backend/.env` file with the following keys:

```env
MONGO_URL=<your-mongodb-connection-string>
DB_NAME=aurvyz
GEMINI_API_KEY=<your-gemini-api-key>
GEMINI_MODEL=gemini-2.5-flash
RESEND_API_KEY=<your-resend-api-key>
SENDER_EMAIL=<your-sender-email>
NOTIFY_EMAIL=<email-to-receive-lead-notifications>
```

---

## 📦 Deployment (Cloud Run)

The platform is optimized for **Google Cloud Run** using a Dockerized architecture.

**Deploy to Production**:
```bash
# Deploy the backend service
gcloud run deploy aurvyz \
  --source . \
  --region europe-west1 \
  --allow-unauthenticated

# Deploy the frontend service
gcloud run deploy aurvyz-frontend \
  --source . \
  --region europe-west1 \
  --allow-unauthenticated
```

**Live Application**: [Launch Aurvyz Outreach Platform](https://autolead-frontend-145662328298.asia-south1.run.app/)

---

## ⚡ Technical Commands Reference

| Action | Command |
| :--- | :--- |
| **Install Backend** | `pip install -r backend/requirements.txt` |
| **Run Backend** | `uvicorn server:app --reload` (in /backend) |
| **Install Frontend** | `npm install` (in /frontend) |
| **Run Frontend** | `npm start` (in /frontend) |
| **Build Docker** | `docker build -t aurvyz-backend -f Dockerfile .` |
| **View Logs** | `gcloud run logs read aurvyz --region europe-west1` |

---

Built with ❤️ by the Aurvyz Engineering Team.
