export default async function handler(req, res) {
  const path = req.query.path.join("/");
  const url = new URL(`https://api.telegram.org/${path}`);

  for (const [k, v] of Object.entries(req.query)) {
    if (k !== "path") url.searchParams.set(k, v);
  }

  const upstream = await fetch(url, {
    method: req.method,
    headers: { "content-type": req.headers["content-type"] ?? "application/json" },
    body: req.method !== "GET" ? JSON.stringify(req.body) : undefined,
  });

  const data = await upstream.json();
  res.status(upstream.status).json(data);
}
