const express = require("express");
const { useController } = require("../controllers/useController");
const middlewarAuth = require("../middleware");

const userRoute = express.Router();

userRoute.get("/", (req, res) => {
  res.render("home");
});
userRoute.get("/g2", middlewarAuth, (req, res) => {
  res.render("g2", { user: req.session.activeUser });
});

userRoute.get("/g", middlewarAuth, (req, res) => {
  res.render("g", { user: req.session.activeUser });
});

userRoute.get("/login", (req, res) => {
  res.render("login");
});

userRoute.get("/signup", (req, res) => {
  res.render("signup");
});
userRoute.get("/user/logout", useController.closeSession);
userRoute.post("/user/findUser", useController.findUser);
userRoute.post("/user/createuser", useController.newUser);
userRoute.post("/user/modifiedUser", useController.modifiedUser);

module.exports = userRoute;
