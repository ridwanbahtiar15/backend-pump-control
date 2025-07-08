// file: server.js
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

let latestState = {};

app.post("/api/update", (req, res) => {
  latestState = req.body;
  // console.log("Update dari ESP:", latestState);
  res.sendStatus(200);
});

app.get("/api/status", (req, res) => {
  res.json(latestState);
  console.log(latestState);
});

app.post("/api/control", async (req, res) => {
  console.log(req.body);
  try {
    const response = await axios.post("http://192.168.0.103:80/set", req.body); // IP ESP
    res.json({ success: true, result: response.data });
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ success: false });
  }
});

app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});
