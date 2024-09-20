function handle(req, res) {
  if (res.locals.loggedUser !== null) {
    res.redirect("/");
    return;
  }
  res.render("login", {
    message: null,
  });
}

module.exports = handle;
