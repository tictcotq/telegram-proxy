export default async function handler(req, res) {
  const url = new URL(req.url, "https://placeholder.com");
  const path = url.pathname.replace(/^\/api\//, "");

  const upstream = await fetch(`https://api.telegram.org/${path}${url.search}`, {
    method: req.method,
    headers: { "content-type": req.headers["content-type"] ?? "application/json" },
    body: req.method !== "GET" && req.method !== "HEAD" ? JSON.stringify(req.body) : undefined,
  });

  const data = await upstream.json();
  res.status(upstream.status).json(data);
}
