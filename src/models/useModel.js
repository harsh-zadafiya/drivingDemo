const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema({
  firstname: { type: String, default: "" },
  lastname: { type: String, default: "" },
  licenseNo: { type: String, default: "" },
  age: { type: Number, default: "" },
  username: { type: String, default: "" },
  password: { type: String, default: "" },
  userType: {
    type: String,
    enum: ["Driver", "Examinner", "Admin"],
    default: "Driver",
    required: true,
  },
  car_info: {
    make: {
      type: String,
      default: "",
    },
    model: {
      type: String,
      default: "",
    },
    year: {
      type: Number,
      default: 0,
    },
    plateno: {
      type: String,
      default: "",
    },
  },
});

const useModel = mongoose.model("User", schema);
module.exports = useModel;
