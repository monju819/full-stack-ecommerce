const blankInput = require("../helpers/blankInput");
const emailValidator = require("../helpers/emailValidator");
const passwordValidator = require("../helpers/passwordValidator");
const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator");
const nodemailer = require("nodemailer");

let otpverificationController = async (req, res) => {
  // Extract data from the request body
  const { email, otp } = req.body;

  let findEmail = await User.findOne({ email: email });
  console.log(findEmail);
  if (findEmail) {
    // console.log(findEmail.otp);
    // console.log(otp);
    if (!findEmail.isEmailVarified && findEmail.otp == otp) {
      await User.findOneAndUpdate(
        { email: email },
        { otp: "", isEmailVarified: true }
      );
      res.send({ success: "otp successfully match" });
    } else {
      res.send({ error: "otp does't match" });
    }
  }
};

module.exports = otpverificationController;
