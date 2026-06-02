const express = require("express");
const cors = require("cors");
require("dotenv").config();

const ojsRoutes = require("./routes/ojsRoutes");

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "APJSI Journal Monitoring API running" });
});

app.use("/api", ojsRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});