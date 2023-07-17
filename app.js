const express = require("express");
const expressSession = require("express-session");
const app = express();
const dotenv = require("dotenv");
const userRoute = require("./src/routes/useRoutes");
const { connectDb } = require("./src/models/index");
dotenv.config();
const { PORT, PORT_URL, SESSION_SECRET } = process.env;

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressSession({ secret: SESSION_SECRET }));

global.userLogged = null;

app.use("*", (req, res, next) => {
  if (req.session && req.session.activeUser) {
    userLogged = req.session.activeUser;
  }
  next();
});

const startApp = () => {
  app.listen(PORT, async () => {
    console.log(`App is listening on port ${PORT_URL}`);
    await connectDb();
  });
  app.get("*", (req, res, next) => {
    res.locals = { req: req };
    next();
  });

  app.use("/", userRoute);
};

startApp();
