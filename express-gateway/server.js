const express = require("express");
const axios = require("axios");
const cors = require("cors");

const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Pokemon Express Gateway (CRUD) Running"
  });
});

// Health endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "ok"
  });
});

// create pokemon
app.post("/pokemon", (req, res) => {
  const { name, type, hp, attack_power } = req.body;

  const sql = `
    INSERT INTO pokemon (name, type, hp, attack_power)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [name, type, hp, attack_power], (error, results) => {
    if (error) {
      return res.status(500).json({ 
        error: error.message 
      });
    }
    res.status(201).json({ 
      message: "Pokemon created successfully", 
      id: results.insertId, name, type, hp, attack_power 
    });
  });
});

// get all pokemon
app.get("/pokemon", (req, res) => {
  const sql = `SELECT * FROM pokemon`;

  db.query(sql, (error, results) => {
    if (error) {
      return res.status(500).json({ 
        error: error.message 
      });
    }
    res.json({ 
      message: "Pokemon retrieved successfully", 
      data: results 
    });
  });
});


// get pokemon by id
app.get("/pokemon/:id", (req, res) => {
  const { id } = req.params;

  const sql = `SELECT * FROM pokemon WHERE id = ?`;

  db.query(sql, [id], (error, results) => {
    if (error) {
      return res.status(500).json({ 
        error: error.message 
      });
    }
    if (results.length === 0) {
      return res.status(404).json({ 
        error: "Pokemon not found" 
      });
    }
    res.json(results[0]);
  });
});

// update pokemon
app.put("/pokemon/:id", (req, res) => {
  const { id } = req.params;
  const { name, type, hp, attack_power } = req.body;

  const sql = `
    UPDATE pokemon 
    SET name = ?, type = ?, hp = ?, attack_power = ?
    WHERE id = ?
  `;

  db.query(
    sql, [name, type, hp, attack_power, id], 
    (error, results) => {
      if (error) {
        return res.status(500).json({ 
          error: error.message 
        });
      }
      res.json({ 
        message: "Pokemon updated successfully" 
      });
    }
  );
});

// delete pokemon
app.delete("/pokemon/:id", (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM pokemon WHERE id = ?`;

  db.query(sql, [id], (error, results) => {
    if (error) {
      return res.status(500).json({ 
        error: error.message 
      });
    }
    res.json({ 
      message: "Pokemon deleted successfully" 
    });
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
  console.log("Express Gateway (Pokemon CRUD API) running on port 3000");
});