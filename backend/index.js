require("dotenv").config();
const express = require("express");
const cors = require("cors");
const secureApi = require("./middleware/secureApi");
const app = express(); // Initialize Express app first
app.use(cors()); // Apply CORS middleware
app.use(express.json());

app.post("/api/v1/auth/registration", secureApi, (req, res) => {
  console.log(req.body);
  // Handle registration logic here
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
