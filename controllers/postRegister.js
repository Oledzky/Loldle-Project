const User = require("../models/user");

async function handle(req, res) {
  if (req.body.password !== req.body.confirmPassword) {
    res.render("register", {
      message: "Podane hasła róznią się",
    });
    return;
  }
  const user = await User.findOne({
    username: req.body.username,
  });
  if (user !== null) {
    res.render("register", {
      message: "Podana nazwa użytkownika już istnieje",
    });
    return;
  }
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  newUser.save().then((newUser) => {
    console.log("Created new user with username:", newUser.username);
    res.redirect("/login");
  });
}

module.exports = handle;
