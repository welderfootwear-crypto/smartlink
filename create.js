import fs from "fs";

const FILE = "./data/links.json";

function randomCode(length = 6) {
  return Math.random().toString(36).substring(2, 2 + length);
}

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { url } = req.body || {};

  if (!url) {
    return res.status(400).json({ error: "URL required" });
  }

  const code = randomCode();

  let db = JSON.parse(fs.readFileSync(FILE));

  db[code] = {
    url,
    clicks: 0,
    createdAt: new Date().toISOString()
  };

  fs.writeFileSync(FILE, JSON.stringify(db, null, 2));

  res.status(200).json({
    success: true,
    code,
    smartlink: `/l/${code}`
  });
}
