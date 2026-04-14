module.exports = async function handler(req, res) {
  const url = new URL(req.url, "https://placeholder.com");

  // Webhook relay: forward incoming bot updates to the configured target
  if (req.method === "POST" && url.pathname === "/api/bot") {
    const target = process.env.WEBHOOK_FORWARD_TARGET;
    if (!target) {
      res.status(500).json({ error: "WEBHOOK_FORWARD_TARGET is not set" });
      return;
    }
    const upstream = await fetch(target, {
      method: "POST",
      headers: { "content-type": req.headers["content-type"] ?? "application/json" },
      body: JSON.stringify(req.body),
    });
    res.status(upstream.status).end();
    return;
  }

  const path = url.pathname.replace(/^\/api\//, "");

  const upstream = await fetch(`https://api.telegram.org/${path}${url.search}`, {
    method: req.method,
    headers: { "content-type": req.headers["content-type"] ?? "application/json" },
    body: req.method !== "GET" && req.method !== "HEAD" ? JSON.stringify(req.body) : undefined,
  });

  const data = await upstream.json();
  res.status(upstream.status).json(data);
};
