import express from "express";
const app = express();

const VALID_API_KEY = "12345abcd";

const apiKeyAuth = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey) {
    res.status(401).json({ message: "API key is missing" });
    return;
  }

  if (apiKey !== VALID_API_KEY) {
    res.status(403).json({ message: "Invalid API key" });
    return;
  }

  next();
};
app.get("/api/private-data", apiKeyAuth, (req, res) => {
  res.json({ message: "Here is the private data!" });
});
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
