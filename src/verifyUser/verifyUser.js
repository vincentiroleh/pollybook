require("dotenv").config();
const Jwt = require("jsonwebtoken");
const User = require("../model/user");

module.exports = async (request, response, next) => {
  try {
    let token = request.headers.authorization;
    //check for token
    if (!token)
      return response
        .status(401)
        .json({ success: false, responseMessage: " Please provide token" });
    token = token.split(" ")[1];
    let decodedToken = Jwt.verify(token, process.env.PAYLOAD_SECRET);
    let verifiedUser = await User.findOne({ email: decodedToken.email });
    if (verifiedUser) 
    next();
  } catch (error) {
    return response
      .status(401)
      .json({
        success: false,
        responseMessage: `Failed to verify User due to this error ${error}`,
      });
  }
};
