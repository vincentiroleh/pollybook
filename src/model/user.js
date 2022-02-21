const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;
const userSchema = new Schema(
  {
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
      min: 6,
    },
  },
  { timestamps: true }
);

module.exports = Mongoose.model("User", userSchema);
