import os
from dotenv import load_dotenv

try:
    import resend
except Exception as e:
    raise ImportError("Missing dependency 'resend'. Install with: pip install resend") from e

load_dotenv()
api_key = os.getenv("RESEND_API_KEY")
if not api_key:
    raise RuntimeError("Missing RESEND_API_KEY in .env")

resend.api_key = api_key


def send_simple_email(to_email: str, message: str | None = None):
    """Send a simple email using Resend.

    Args:
        to_email: recipient email address
        message: HTML or plain text body (will be wrapped in a paragraph if plain)
    Returns:
        The resend API response object/dict
    """
    html = message or "<p>Congrats on sending your <strong>first email</strong>!</p>"
    return resend.Emails.send({
        "from": "onboarding@resend.dev",
        "to": to_email,
        "subject": "Message from Portfolio",
        "html": html,
    })
