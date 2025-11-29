# API Integration Platform

A backend-heavy full-stack project where authenticated users can create, trigger, and monitor API integrations — similar in spirit to tools like Zapier or n8n.

Built with **Node.js, Express, MongoDB, JWT auth, and React (Vite)**.

---

## ✨ Features

- 🔐 **JWT Authentication**
  - User signup & login
  - Protected routes with auth middleware
  - Current user endpoint (`/api/auth/me`)

- 🔗 **Integration Management**
  - Create integrations with:
    - Name, service (e.g. Slack, Teams, custom)
    - Target endpoint URL
    - HTTP method (POST / GET / PUT)
    - JSON payload
  - Store integrations per user in MongoDB

- 🚀 **Trigger Engine**
  - Backend calls third-party APIs using Axios
  - Logs status: `pending | success | failed`
  - Saves `lastTriggeredAt` and `lastResponse` (status code + body)
  - Retry failed integrations from the dashboard

- 🖥️ **React Dashboard**
  - Login via JWT
  - Create new integrations from UI
  - List all integrations for logged-in user
  - Trigger / retry integrations from the table
  - Live status & last trigger timestamp

---

## 🧱 Tech Stack

**Backend**
- Node.js, Express
- MongoDB + Mongoose
- JWT for authentication
- Axios for external API calls
- dotenv for configuration

**Frontend**
- React (Vite)
- Axios
- React Router

---

## 📂 Project Structure

```text
api-integration-platform/
├── backend/
│   ├── src/
│   │   ├── config/        # DB connection, etc.
│   │   ├── middleware/    # auth middleware
│   │   ├── models/        # User, Integration
│   │   ├── routes/        # authRoutes, integrationRoutes
│   │   └── app.js, index.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/           # apiClient (Axios instance)
│   │   ├── components/    # IntegrationList, IntegrationForm
│   │   └── pages/         # LoginPage, Dashboard
│   └── package.json
└── README.md

⚙️ Getting Started (Local Setup)

1. Clone the repo
git clone https://github.com/Deepakshaiva/api-integration-platform.git
cd api-integration-platform

2. Backend setup
cd backend
npm install


Create a .env file in backend:

PORT=4000
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
NODE_ENV=development


Run backend:

npm run dev
# Server: http://localhost:4000

3. Frontend setup
cd ../frontend
npm install
npm run dev
# Vite dev server: http://localhost:5173

🔍 Example Flow

Sign up or log in from frontend (React UI).

Create an integration (e.g. Webhook.site URL + JSON payload).

Click Trigger:

Backend sends request via Axios.

Response is stored in MongoDB.

Status & last trigger time update in the dashboard.

If failed, click Retry to trigger again.

🚧 Future Enhancements

Role-based admin view

Pagination and filtering for integrations

Integration execution history per run

UI styling with Tailwind / Material UI

Deployment to Render (backend) and Vercel (frontend)

License


That alone will make your repo look 3× more professional.

---

## 2️⃣ Add this project to your resume (ATS-friendly)

Under **Projects**:

> **API Integration Platform — Node.js, Express, MongoDB, React**  
> • Built a backend-heavy full-stack API integration platform where authenticated users can create, trigger, and monitor external API workflows (similar to Zapier-style automations).  
> • Implemented secure JWT authentication, protected routes, and user-specific integration storage using Node.js, Express, and MongoDB.  
> • Created an integration trigger engine using Axios that calls third-party APIs, logs responses, tracks `success/failed` status, and stores `lastTriggeredAt` + `lastResponse` for each integration.  
> • Developed a React dashboard (Vite) with login, integration creation form, live integration table, and trigger/retry actions consuming the backend REST APIs.

For a shorter CV version:

> **API Integration Platform (Node.js, MongoDB, React)** – Built a JWT-secured full-stack app that lets users create API integrations, trigger external webhooks, and view real-time status and logs from a React dashboard.

---

## 3️⃣ Next: what we can do

Now that code is safely on GitHub, we can:

1. **Polish UI** (Tailwind or simple CSS)  
2. **Add Delete integration** (small but useful)  
3. **Deploy backend + frontend** so you have a live link for applications  
4. Craft a **LinkedIn post** announcing the project

If you tell me what you want to do first (UI polish, delete, deploy, or resume/LinkedIn), I’ll walk you through it step by step.
::contentReference[oaicite:0]{index=0}
