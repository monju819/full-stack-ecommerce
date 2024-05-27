const express = require("express");
const secureApi = require("../../middleware/secureApi");
const registrationController = require("../../controller/registrationController");
const otpverificationController = require("../../controller/otpverificationController");
const _ = express.Router();

_.post("/registration", secureApi, registrationController);
_.post("/otpverification", otpverificationController);

module.exports = _;
