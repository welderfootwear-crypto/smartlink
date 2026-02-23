import fs from "fs";

const FILE = "./data/links.json";

export default function handler(req, res) {
  const { code } = req.query;

  let db = JSON.parse(fs.readFileSync(FILE));

  if (!db[code]) {
    return res.status(404).json({ error: "Not found" });
  }

  res.status(200).json(db[code]);
}
