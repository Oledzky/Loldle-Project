const User = require("../models/user");
const jwt = require("../jwt");

async function authenticate(username, password) {
  try {
    const existingUser = await User.findOne({
      username: username,
      password: password,
    });
    if (existingUser === null) {
      return null;
    }
    return jwt.generateToken(username);
  } catch (err) {
    return err;
  }
}

function handle(req, res) {
  authenticate(req.body.username, req.body.password).then((result) => {
    if (result !== null) {
      res.cookie("authToken", result, { httpOnly: true });
      res.redirect("/");
    } else {
      res.render("login", { message: "Wrong credentials!" });
    }
  });
}

module.exports = handle;
