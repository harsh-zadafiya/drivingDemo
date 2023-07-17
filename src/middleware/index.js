module.exports = (req, res, next) => {
  if (!req.session.activeUser) {
    return res.redirect("/login");
  } else {
    if (req.session.activeUser && req.session.activeUser.userType !== "Driver") {
      return res.redirect("/");
    }
  }
  next();
};
