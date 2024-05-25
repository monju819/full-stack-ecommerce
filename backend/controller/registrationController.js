const blankInput = require("../helpers/blankInput");
const emailValidator = require("../helpers/emailValidator");
const passwordValidator = require("../helpers/passwordValidator");
const User = require("../model/userModel");
const bcrypt = require("bcrypt");
let registrationController = async (req, res) => {
  // Extract data from the request body
  const { username, email, password } = req.body;

  if (blankInput(username)) {
    res.send({ error: "username required" });
  } else if (blankInput(email)) {
    res.send({ error: "email required" });
  } else if (!emailValidator(email)) {
    res.send({ error: " valid email required" });
  } else if (blankInput(password)) {
    res.send({ error: "password required" });
  } else if (passwordValidator(password)) {
    res.send({ error: "password is sort" });
  } else {
    let existingEmail = await User.find({
      email: email,
    });
    console.log(existingEmail);
    if (existingEmail.length > 0) {
      res.send({ error: `${email} already exists` });
    } else {
      bcrypt.hash(password, 10, function (err, hash) {
        let user = new User({
          username: username,
          email: email,
          password: hash,
        });
        user.save();
        res.send({
          username: user.username,
          email: user.email,
          role: user.role,
        });
      });
    }
  }

  // Validate input data (e.g., check if required fields are present, validate email format, etc.)
};

module.exports = registrationController;
