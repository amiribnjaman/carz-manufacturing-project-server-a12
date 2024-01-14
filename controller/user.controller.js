const User = require("../model/user.model");
const jwt = require("jsonwebtoken");

/**
 *
 * Getting All Users API Endpoint
 *
 **/
const getAllUser = async (req, res) => {
  const result = await User.find({});
  res.send({ status: "200", 'data': result });
};

/**
 *
 * Update or insert a user's api endpoint
 *
 **/
const user = async (req, res) => {
  const {name,email, password, role, education, linkedIn, location, number } = req.body;
  // console.log(
  //   name,
  //   email,
  //   password,
  //   role,
  //   education,
  //   linkedIn,
  //   location,
  //   number
  // );
  const data = {
    name,
    email,
    password,
    role,
    education,
    linkedIn,
    location,
    number,
  };
  const token = jwt.sign({ email: data.email }, process.env.ACCESS_TOKEN);
  const user = await User.findOne({email});

  if (user) {
    const result = await User.updateOne(
      {
        email: data.email,
      },
      { $set: data }
    );

    return res.send({ msg: "User Updated", result, token });
  } else {
    const user = new User(data);
    await user.save()
    console.log(user, token)
    return res.send({ msg: "User created", token });
  }
};

module.exports = { getAllUser, user };
