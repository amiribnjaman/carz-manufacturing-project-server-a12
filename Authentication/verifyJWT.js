const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const auth = req.headers.authorization;
  if (auth) {
    const TOKEN = auth.split(" ")[1];
    jwt.verify(TOKEN, process.env.ACCESS_TOKEN, TOKEN, function (err, decoded) {
      if (err) {
        return res.status(403).send({ msg: "Access Denied" });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(401).send({ msg: "Unathorized Access" });
  }
};


module.exports = verifyJWT