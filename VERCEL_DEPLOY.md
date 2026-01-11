Vercel deployment notes

1. Environment variables (set these in your Vercel project Settings > Environment Variables):
   - `RESEND_API_KEY` — your Resend API key (keeps the key server-side)
   - `TO_EMAIL` — the recipient email address (your inbox)

2. Files added:
   - `api/send-email.js` — Vercel Serverless Function that forwards messages to Resend

3. Quick deploy (CLI):

```bash
# install Vercel CLI if needed
npm i -g vercel

# from the project root
vercel login
vercel --prod
```

4. Notes:
   - Ensure the `TO_EMAIL` value is the email you want incoming messages sent to.
   - `RESEND_API_KEY` must be a valid Resend API key. The function uses the Resend REST API.
   - After deploying, the frontend will POST to `/api/send-email` (same origin) so no CORS changes are required.
