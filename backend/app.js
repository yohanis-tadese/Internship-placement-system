const express = require("express");
const cors = require("cors");
require("dotenv").config();
const router = require("./router/index");

const app = express();

// Add CORS middleware
app.use(cors());

// Add express.json middleware
app.use(express.json());

// Add router middleware
app.use(router);

const port = process.env.PORT;

// Start the webserver
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

module.exports = app;
