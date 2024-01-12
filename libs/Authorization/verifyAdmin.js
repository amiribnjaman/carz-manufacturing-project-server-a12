const adminVerification = async (req, res, next) => {
  const requesterEmail = req.decoded.email;
  const filter = { email: requesterEmail };
  const requesterVerify = await userCollection.findOne(filter);
  if (requesterVerify.role == "admin") {
    next();
  } else {
    res.status(403).send({ msg: "Forbidden" });
  }
};


module.exports = adminVerification