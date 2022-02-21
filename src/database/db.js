require("dotenv").config();
const Mongoose = require("mongoose");

module.exports = {
  connect: () => {
    Mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const connection = Mongoose.connection;
    connection.once("open", () => {
      console.log("Database is connected successfully");
    });
    connection.on("error", (error) => {
      console.log(
        `Failed to connect to the database due to this error ${error}`
      );
    });
  },
};
