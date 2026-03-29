const express = require("express");
const cors = require("cors");
const pool = require("./config/db"); 

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// route utama
app.get("/", (req, res) => {
  res.send("API Service Motor Jalan 🚀");
});

// 🔌 TEST KONEKSI DATABASE
app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      message: "Koneksi database berhasil",
      time: result.rows[0].now
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Koneksi database gagal",
      error: err.message
    });
  }
});

// jalankan server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const userRoutes = require("./routes/userRoutes");

app.use("/api/users", userRoutes);

console.log(process.env.DB_NAME);