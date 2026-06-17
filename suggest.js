// Serverless proxy for the Anthropic API.
// Deploy on Vercel (free). Keeps your API key server-side so it is
// never exposed in the browser.
//
// Setup:
//   1. Push this repo to Vercel (vercel.com → New Project → import repo)
//   2. In Vercel → Settings → Environment Variables, add:
//        ANTHROPIC_API_KEY = sk-ant-...   (your key)
//   3. Copy the deployed URL into config.js:
//        window.PULSE_PROXY_URL = "https://<your-project>.vercel.app/api/suggest"
//
// The browser sends only { prompt }. The key stays here.

export default async function handler(req, res) {
  // CORS — allow your GitHub Pages origin to call this function.
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST")  return res.status(405).json({ error: "Method not allowed" });

  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return res.status(500).json({ error: "ANTHROPIC_API_KEY not configured" });

  try {
    const { prompt } = req.body || {};
    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ error: "Missing prompt" });
    }

    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 1000,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await r.json();
    return res.status(r.status).json(data);
  } catch (err) {
    return res.status(500).json({ error: "Proxy request failed" });
  }
}
