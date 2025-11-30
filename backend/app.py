import os
from fastapi import FastAPI, HTTPException
from fastapi import Request
from pydantic import BaseModel, EmailStr
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

from send_email import send_simple_email

app = FastAPI(title="Portfolio Email Sender")


@app.middleware("http")
async def log_send_requests(request: Request, call_next):
    # Log method and headers for /send to debug CORS preflight issues
    if request.url.path == "/send":
        try:
            headers = dict(request.headers)
            print("[DEBUG] /send request -> method:", request.method, "headers:", headers)
        except Exception:
            pass
    return await call_next(request)

origins = os.getenv("FRONTEND_ORIGINS", "http://localhost:5173").split(",")
# NOTE: For development/debugging we temporarily allow all origins so
# CORS preflight won't block different dev host/port combos. Replace
# this with the explicit origins list (`[o.strip() for o in origins if o.strip()]`)
# before deploying to production.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # DEVELOPMENT ONLY
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class SendRequest(BaseModel):
    to: EmailStr
    message: str | None = None


@app.post("/send")
async def send(req: SendRequest):
    try:
        resp = send_simple_email(req.to, req.message)
        return {"ok": True, "response": resp}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
