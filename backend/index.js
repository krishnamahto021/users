const express = require("express");
const dotenv = require("dotenv").config();
const path = require("path");

const connectDB = require("./config/db");
const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded());

app.use("/api", require("./routes"));

const PORT = process.env.PORT || 8080;

/*---------------------DEPLOYMENT-----------------------*/

const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "frontend", "dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Running on development");
  });
}

/*---------------------DEPLOYMENT-----------------------*/

app.listen(PORT, console.log(`Server is running on the port ${PORT}`));
