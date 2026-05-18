const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Pokemon Express Gateway Running"
  });
});

// Health endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "ok"
  });
});

// Pokemon recommendation endpoint
app.post("/pokemon/recommend", async (req, res) => {
  try {
    const { name, hp, attack, defense, speed } = req.body;
    const mlResponse = await axios.post(
      "http://127.0.0.1:8000/predict",
      {
        hp,
        attack,
        defense,
        speed
      }
    );

    res.json({
      pokemon: name,
      stats: {
        hp,
        attack,
        defense,
        speed
      },
      prediction: mlResponse.data.prediction
    });

  } catch (error) {
    res.status(500).json({
      error: "ML Service unavailable",
      detail: error.message
    });

  }

});

app.listen(3000, () => {
  console.log("Express Gateway running on port 3000");
});