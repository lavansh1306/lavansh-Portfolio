# Backend (FastAPI) for sending emails

This small FastAPI app exposes a POST `/send` endpoint that uses the Resend Python SDK to send emails.

## Setup

From the `backend` folder:

```sh
python -m venv .venv
. .venv/bin/activate
pip install -r requirements.txt
```

Create a `.env` file in `backend/` (or set environment variables) with:

```
RESEND_API_KEY=your_resend_api_key_here
# Optional: comma-separated allowed origins for CORS
FRONTEND_ORIGINS=http://localhost:5173
```

Note: You can copy the root `.env` if it already contains `RESEND_API_KEY`:

```sh
cp ../.env .env
```

## Run the server

```sh
uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

## Endpoint

POST `/send` with JSON body:

```json
{
  "to": "recipient@example.com",
  "message": "<p>Your HTML message here</p>"
}
```

Response on success:

```json
{ "ok": true, "response": { /* resend response */ } }
```

## Frontend

The frontend will call `http://localhost:8000/send` by default. To change, set `VITE_EMAIL_BACKEND_URL` in the frontend environment (e.g., `.env` for Vite):

```
VITE_EMAIL_BACKEND_URL=http://localhost:8000/send
```

## Security

- Keep `RESEND_API_KEY` secret. Do not commit it.
- In production, run the backend separately and secure the endpoint.
