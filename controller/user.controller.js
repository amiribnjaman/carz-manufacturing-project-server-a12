const User = require("../model/user.model");
const jwt = require("jsonwebtoken");


/**
 *
 * Getting All Users API Endpoint
 *
 **/
const getAllUser = async (req, res) => {
  const result = await User.findMany({});
  res.send({ status: "200", result });
};

/**
 *
 * Update or insert a user's api endpoint
 *
 **/
const getUser = async (req, res) => {
    const data = req.body;
    const token = jwt.sign({ email: data.email }, process.env.ACCESS_TOKEN);
    const query = { email: data.email };
    const user = await User.findOne(query);

    if (!user) {
      const options = { upsert: true };
      const updateDoc = {
        $set: data,
      };
      const result = await userCollection.updateOne(query, updateDoc, options);
      return res.send({ result, token });
    }
  return res.send({ token });
  
}

module.exports = { getAllUser, getUser };
