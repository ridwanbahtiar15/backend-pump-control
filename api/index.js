require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// === State Storage ===
let latestState = {};
let latestControl = {};

// === Root Test ===g
app.get("/", (req, res) => {
  res.json({ message: "ESP Backend API running." });
});

// === ESP Push Status ===
app.post("/api/update", (req, res) => {
  latestState = req.body;
  console.log("[ESP Update]", latestState);
  res.sendStatus(200);
});

// === Frontend Get Status ===
app.get("/api/status", (req, res) => {
  res.json(latestState);
});

// === Frontend Send Control Command ===
app.post("/api/control", (req, res) => {
  latestControl = req.body;
  console.log("[Control Update]", latestControl);
  res.json({ success: true, message: "Control command updated." });
});

// === ESP Poll Control Command ===
app.get("/api/control", (req, res) => {
  res.json(latestControl);
});

// === Start Server ===
app.listen(port, () => {
  console.log(`🚀 ESP Backend API running at http://localhost:${port}`);
});
