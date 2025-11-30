# Deploying the backend to Render

This document explains how to deploy the FastAPI backend on Render and connect it to the Vercel frontend.

1) Prepare repo
- Push your repository to GitHub (you said everything was already pushed before earlier changes).
- Ensure `backend/requirements.txt` lists required packages (it does).
- Do NOT commit secrets. We created `backend/.env` locally for testing but it's ignored by `.gitignore`.

2) Create a new Web Service on Render
- Go to https://dashboard.render.com and click "New" -> "Web Service".
- Connect your GitHub repo and pick the `main` branch.
- Use these settings (or use the `render.yaml` we added to the repo):
  - Environment: "Python"
  - Build Command: `pip install -r backend/requirements.txt`
  - Start Command: `uvicorn app:app --host 0.0.0.0 --port $PORT`
  - Region: choose the region nearest your users (e.g., `oregon`).

3) Set environment variables (in the Render dashboard)
- `RESEND_API_KEY` = (your Resend API key) — secret
- `FRONTEND_ORIGINS` = `https://<your-vercel-site>.vercel.app` (set to your Vercel URL)

4) Deployment and health check
- Render will build and deploy the service. The health endpoint is: `GET /health`.
- After deploy, note the service URL, e.g. `https://lavansh-portfolio-backend.onrender.com`.

5) Connect the frontend (Vercel)
- In your Vercel project settings, set the following Environment Variable for the Production scope:
  - `VITE_EMAIL_BACKEND_URL` = `https://<your-render-service>/send`
- Redeploy the frontend (Vercel will use the updated env vars during build). The frontend will now POST to your Render backend endpoint.

6) Production considerations
- Make sure `FRONTEND_ORIGINS` contains the exact Vercel URL(s) to avoid CORS issues.
- Monitor logs in Render and add alerts/health checks as needed.
- Rotate `RESEND_API_KEY` if it is ever committed or leaked.

7) Optional: Use a custom domain and TLS
- Render supports custom domains and automatic TLS — add a domain in the Render dashboard and follow instructions.

If you want, I can:
- Create a small `Dockerfile` instead and show how to deploy using Render's Docker option.
- Automatically set up a Render service via `render.yaml` (we added a manifest, but secret values must be set in the Render UI).
- Update your Vercel environment variable automatically (I can prepare the exact value you should paste into Vercel once your Render service URL is live).
