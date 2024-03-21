const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded());

app.use("/api", require("./routes"));

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server is running on the port ${PORT}`));
