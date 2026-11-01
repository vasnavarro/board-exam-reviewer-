// Vercel Serverless Function for PassBoard Cloud Sync
// Proxies and persists data to high-speed KV store

const BUCKET = "7eqz38xrdPbpp51xeVYMf2";
const KVDB_BASE = `https://kvdb.io/${BUCKET}`;

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { searchParams } = new URL(req.url, `https://${req.headers.host || "localhost"}`);
  const key = searchParams.get("key") || "leane";
  const sanitizedKey = key.replace(/[^a-zA-Z0-9_\-]/g, "_");
  const targetUrl = `${KVDB_BASE}/${sanitizedKey}`;

  try {
    if (req.method === "GET") {
      const response = await fetch(targetUrl, {
        headers: { "Accept": "application/json" }
      });
      if (response.status === 404) {
        return res.status(200).json({ found: false, message: "No cloud profile found yet for this key." });
      }
      if (!response.ok) {
        return res.status(response.status).json({ error: "Failed to fetch cloud profile" });
      }
      const data = await response.json();
      return res.status(200).json({ found: true, data });
    }

    if (req.method === "POST") {
      const body = typeof req.body === "string" ? req.body : JSON.stringify(req.body);
      const response = await fetch(targetUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body
      });
      if (!response.ok) {
        return res.status(response.status).json({ error: "Failed to save cloud profile" });
      }
      return res.status(200).json({ success: true, timestamp: new Date().toISOString() });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error("Cloud Sync API Error:", err);
    return res.status(500).json({ error: err.message || "Internal sync error" });
  }
}
