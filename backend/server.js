require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db.js");

const authRoutes = require("./routes/authRoutes.js");
const todoRoutes = require("./routes/todoRoutes.js");
const adminRoutes = require("./routes/adminRoutes.js")
const cors = require("cors");
const app = express();

connectDB();

app.use(cors({
    origin: "http://127.0.0.1:5173",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);
app.use("/api/admin",adminRoutes)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});