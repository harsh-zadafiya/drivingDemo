const {
  encPassword,
  validatePassword,
} = require("../configration/passwordConfig");
const { useModel } = require("../models");

class useController {
  static closeSession = async (req, res) => {
    req.session.destroy(() => {
      userLogged = null;
      res.redirect("/");
    });
  };

  static findUser = async (req, res) => {
    const { username, password } = req.body;

    try {
      const user = await useModel.findOne({ username: username });
      if (user) {
        const isValidPassword = await validatePassword(password, user.password);
        console.log(isValidPassword);
        if (isValidPassword) {
          req.session.activeUser = user;
          return res.redirect("/");
        }

        return res.render("login", {
          errors: { msg: "Incorrect Password" },
          req,
        });
      }

      res.render("login", { errors: { msg: "User Not Found" }, req });
    } catch (error) {
      res.render("login", { errors: { msg: "User Not found" }, req });
      console.error(error);
    }
  };

  static newUser = async (req, res) => {
    const formInfo = req.body;
    const errMsg = {};

    if (formInfo.username) {
      try {
        const user = await useModel.findOne({ username: formInfo.username });
        if (user) {
          errMsg["username"] = "Username is already in use!";
        }
      } catch (error) {
        console.log(error);
        return res.render("signup", {
          errors: { global: "User is not Created!" },
          req,
        });
      }
    }

    if (errMsg && Object.keys(errMsg).length > 0) {
      return res.render("signup", { errors: errMsg, req });
    }

    const UserObject = {
      username: formInfo.username,
      password: formInfo.password,
      userType: formInfo.userType,
      firstname: formInfo.firstname,
      lastname: formInfo.lastname,
      licenseNo: formInfo.licenseNo,
      age: parseInt(formInfo.age) || 0,
      car_info: {
        make: formInfo.make,
        model: formInfo.model,
        year: parseInt(formInfo.year) || 0,
        plateno: formInfo.plateno,
      },
    };

    try {
      const encPass = encPassword(formInfo.password);
      UserObject.password = encPass;

      await useModel.create(UserObject);

      res.render("signup", { success: { msg: "Registration success!" }, req });
    } catch (error) {
      res.render("signup", { errors: { global: "User is not Created!" }, req });
      console.error(error);
    }
  };

  static modifiedUser = async (req, res) => {
    const formInfo = req.body;

    const UserObject = {
      firstname: formInfo.firstname,
      lastname: formInfo.lastname,
      licenseNo: formInfo.licenseNo,
      age: parseInt(formInfo.age) || 0,
      car_info: {
        make: formInfo.make,
        model: formInfo.model,
        year: parseInt(formInfo.year) || 0,
        plateno: formInfo.plateno,
      },
    };

    try {
      const modifiedUser = await useModel.findOneAndUpdate(
        {
          _id: formInfo.userId,
        },
        {
          ...UserObject,
        },
        {
          new: true,
        }
      );

      if (modifiedUser) {
        req.session.activeUser = modifiedUser;
        return res.redirect("/g");
      }

      res.render("g", { errors: { msg: "User is not updated!" }, req });
    } catch (error) {
      res.render("g", { errors: { global: "User is not Created!" }, req });
      console.error(error);
    }
  };
}
module.exports = {
  useController,
};
