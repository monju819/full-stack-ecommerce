const blankInput = require("../helpers/blankInput");
const emailValidator = require("../helpers/emailValidator");
const passwordValidator = require("../helpers/passwordValidator");
const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator");
const nodemailer = require("nodemailer");

let registrationController = async (req, res) => {
  // Extract data from the request body
  const { username, email, password } = req.body;

  if (blankInput(username)) {
    return res.send({ error: "username required" });
  } else if (blankInput(email)) {
    return res.send({ error: "email required" });
  } else if (!emailValidator(email)) {
    return res.send({ error: " valid email required" });
  } else if (blankInput(password)) {
    return res.send({ error: "password required" });
  } else if (passwordValidator(password)) {
    return res.send({ error: "password is short" });
  } else {
    try {
      let existingEmail = await User.find({ email: email });
      console.log(existingEmail);

      if (existingEmail.length > 0) {
        return res.send({ error: `${email} already exists` });
      } else {
        // Generate OTP
        const otp = otpGenerator.generate(6, {
          lowerCaseAlphabets: false,
          upperCaseAlphabets: false,
          specialChars: false,
        });
        console.log("Generated OTP:", otp);

        const hash = await bcrypt.hash(password, 10);

        let user = new User({
          username: username,
          email: email,
          password: hash,
          otp: otp,
        });

        await user.save();

        // Configure nodemailer
        const transporter = nodemailer.createTransport({
          service: "gmail",
          secure: false,
          auth: {
            user: "sajidhasan819@gmail.com",
            pass: "zjga bcdb nsqd ijza",
          },
        });

        // Send OTP email
        const mailOptions = {
          from: "sajidhasan819@gmail.com", // sender address
          to: email, // recipient email address
          subject: "Email Verification OTP", // Subject line
          html: `<p>Hello,</p><p>Your OTP is: <b>${otp}</b></p>`, // html body
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error("Error sending email:", error);
            return res.send({ error: "Failed to send OTP email" });
          } else {
            console.log("Email sent: ", info.response);
            return res.send({
              username: user.username,
              email: user.email,
              role: user.role,
            });
          }
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      return res.send({ error: "An error occurred during registration" });
    }
  }
};

module.exports = registrationController;
