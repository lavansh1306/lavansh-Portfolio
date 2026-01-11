// Vercel Serverless Function to forward contact form messages to Resend
// Expects environment variables: RESEND_API_KEY, TO_EMAIL

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // Parse JSON body (Vercel may already provide parsed body)
    let body = req.body && Object.keys(req.body).length ? req.body : null;
    if (!body) {
      body = await new Promise((resolve, reject) => {
        let data = '';
        req.on('data', (chunk) => (data += chunk));
        req.on('end', () => {
          try {
            resolve(data ? JSON.parse(data) : {});
          } catch (e) {
            reject(e);
          }
        });
        req.on('error', reject);
      });
    }

    const { name, email, message } = body || {};

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.TO_EMAIL;
    if (!apiKey) return res.status(500).json({ error: 'Missing RESEND_API_KEY' });
    if (!toEmail) return res.status(500).json({ error: 'Missing TO_EMAIL' });

    const sender = `${name || 'Anonymous'} <${email || 'noreply@example.com'}>`;
    const html = `
      <p><strong>From:</strong> ${sender}</p>
      <hr/>
      <div>${(message || '').replace(/\n/g, '<br/>')}</div>
    `;

    const payload = {
      from: 'onboarding@resend.dev',
      to: toEmail,
      subject: `Portfolio message from ${name || email || 'visitor'}`,
      html,
    };

    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await r.json();
    if (!r.ok) {
      console.error('Resend error', data);
      return res.status(500).json({ error: data });
    }

    return res.status(200).json({ ok: true, response: data });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: String(err) });
  }
};
