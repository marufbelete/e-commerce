const jwt = require("jsonwebtoken");
const config = require("../config.json");

const authenticateJWT = (req, res, next) => {
  console.log(req.headers)
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    // const token = authHeader
    console.log("midleware")
    jwt.verify(token, config.SECRET, (err, user) => {
      if (err) {
        return res.stattus.render('/login');
      }
      req.user = user;
      console.log(user)
      next();
    });
  }
  else {
    res.render('/login');
  }

};

module.exports = authenticateJWT;


