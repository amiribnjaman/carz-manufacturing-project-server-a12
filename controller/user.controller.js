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
  const data = req.body;
  const token = jwt.sign({ email: data.email }, process.env.ACCESS_TOKEN);
  const query = { email: data.email };
  const user = await User.findOne(query);

  if (user) {
    const result = await User.updateOne(
      {
        email: data.email,
      },
      { $set: data }
    );

    return res.send({ msg: "User Updated",result, token });
  } else {
    const user = new User(data);
    await user.save()
    return res.send({ msg: "User created", token });
  }
};

module.exports = { getAllUser, user };
