const express = require("express");
const _ = express.Router();
const apiRoutes = require("./api");

let apiBase = process.env.BASEURLAPI;
_.use(apiBase, apiRoutes);

_.use(apiBase, (req, res) => res.send("api not found"));

module.exports = _;
