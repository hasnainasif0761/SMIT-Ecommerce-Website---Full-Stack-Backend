const express = require('express');
const connectdb = require('./config/db');
const dns = require("node:dns");
const router = require('./router/user');
dns.setServers(["1.1.1.1", "8.8.8.8"]);
const path = require('path');
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()

const filepath = path.join(process.cwd());

const app = express();

app.use('/uploads',express.static("uploads"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.use('/form',router)
// Express error handling middleware
app.use((err, req, res, next) => {
  console.error("Global Error Handler:", err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "An unexpected error occurred",
  });
});

app.set('view engine','ejs')
app.set('views',path.join(__dirname, "view"))

app.get('/', (req, res) => {
    res.json({
        message: "API is running"
    });
});

connectdb()

module.exports = app;
