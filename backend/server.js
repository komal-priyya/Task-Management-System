require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const todoRoutes = require("./routes/todoRoutes");
const cors = require("cors");
const app = express();

connectDB();

app.use(cors({
    origin: "http://127.0.0.1:5500",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});