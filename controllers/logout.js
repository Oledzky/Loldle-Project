function handle(req, res) {
  res.clearCookie("authToken");
  res.locals.loggedUser = null;
  res.redirect("/login");
}

module.exports = handle;
