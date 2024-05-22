require("dotenv").config();
const express = require("express");
const cors = require("cors");

const routes = require("./routes");
const app = express(); // Initialize Express app first
app.use(cors()); // Apply CORS middleware
app.use(express.json());
app.use(routes); // index routes ta backend index er sathe add korlam

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
