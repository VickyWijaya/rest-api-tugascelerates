const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// GET semua users
router.get("/", async (req, res) => {
  const result = await pool.query("SELECT * FROM customers");
  res.json(result.rows);
});

// GET user by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await pool.query(
    "SELECT * FROM customers WHERE id = $1",
    [id]
  );
  res.json(result.rows[0]);
});

// POST buat user baru
router.post("/", async (req, res) => {
  const { name, phone, address } = req.body;

  const result = await pool.query(
    "INSERT INTO customers (name, phone, address) VALUES ($1, $2, $3) RETURNING *",
    [name, phone, address]
  );

  res.json(result.rows[0]);
});

// PUT update user
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, phone, address } = req.body;

  const result = await pool.query(
    "UPDATE customers SET name=$1, phone=$2, address=$3 WHERE id=$4 RETURNING *",
    [name, phone, address, id]
  );

  res.json(result.rows[0]);
});

// DELETE user
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  await pool.query("DELETE FROM customers WHERE id=$1", [id]);

  res.json({ message: "User deleted" });
});

module.exports = router;