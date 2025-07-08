require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let latestState = {};

// cors
app.use(
  cors({
    origin: "*",
    methods: ["POST", "PATCH", "DELETE"],
  })
);

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

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
    const response = await axios.post(`${process.env.ESP_HOST}/set`, req.body); // IP ESP
    res.json({ success: true, result: response.data });
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ success: false });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
