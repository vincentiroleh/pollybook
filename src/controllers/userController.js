require("dotenv").config();
const User = require("../model/user");
const Jwt = require("jsonwebtoken");
const Bcrypt = require("bcryptjs");

exports.createUser = async (request, response) => {
  let { email, password } = request.body;
  password = Bcrypt.hashSync(request.body.password, 10);
  // check for existing user
  let existingUser = await User.findOne({ email: request.body.email});
  if (existingUser)
    return response.status(422).json({
      success: "Failed",
      responseMessage: `User with this email ${email} already exist , try again with another email`,
    });

  try {
    let newUser = new User({
      email,
      password,
    });
    let userData = await newUser.save();
    userData = userData.toJSON();
    delete userData.password;

    const userPayload = {
      email: userData.email,
    };

    
    const userToken = Jwt.sign(userPayload, process.env.PAYLOAD_SECRET);
    return response.status(200).json({
      success: true,
      responseMessage: userPayload,
      token: userToken,
    });
  } catch (error) {
    return response.status(422).json({
      success: "Failed",
      responseMessage: ` Cannot register user due to this error ${error}`,
    });
  }
};

exports.login = async (request, response) => {
  let userEmail = await User.findOne({ email: request.body.email });
  if (!userEmail)
    respons.status(422).json({
      success: "Failed",
      responseMessage: `No user with this ${userEmail} , please try with a differnt email`,
    });

  try {
    userEmail && Bcrypt.compareSync(request.body.email, userEmail.email);
    const loginToken = Jwt.sign(
      { userEmail: userEmail.email },
      process.env.PAYLOAD_SECRET
    );
    return response
      .status(200)
      .json({ success: true, token: loginToken, user_email: userEmail.email });
  } catch (error) {
    return response
      .status(422)
      .json({
        success: false,
        responseMessage: `Cannot sign in user due to this error ${error}`,
      });
  }

  
};
