require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const { ErrorMiddleware } = require("./utils/ErrorHandler");

const queueRoutes = require("./routes/queueRoutes");

const app = express();

app.use(express.json());

// Verilənlər bazasına qoşulma fonksiyonu
connectDB();

// Queue endpoint-ləri
app.use("/api/queue", queueRoutes);

// Qlobal xəta idarəetmə middleware-i
app.use(ErrorMiddleware);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});