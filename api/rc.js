export default async function handler(req, res) {
  const { rc } = req.query;

  if (!rc) {
    return res.status(400).json({ error: "RC number required" });
  }

  const apiUrl = `https://vehicle-eight-vert.vercel.app/api?rc=${encodeURIComponent(rc)}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "API fetch failed" });
  }
                                                                 }
