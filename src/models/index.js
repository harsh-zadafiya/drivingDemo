const useModel = require("./useModel");
const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const { MONGOOSE_URI } = process.env;

const connectDb = async () => {
  try {
    await mongoose.connect(MONGOOSE_URI);

    console.log("DB is connected!!!");
  } catch (err) {
    console.log("DB error", err);
  }
};

module.exports = {
  connectDb,
  useModel,
};
