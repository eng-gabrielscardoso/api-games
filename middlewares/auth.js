require('dotenv-safe').config();
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

function auth (req, res, next) {
  const authToken = req.headers['authorization'];
  
  if (authToken != undefined) {
    const bearer = authToken.split(' ');
    const token = bearer[1];

    jwt.verify(token, 
      jwtSecret,
      (err, data) => {
        if (err) {
          res.statusCode = 401;
          res.json({ "err": "Token inválido" });
        } else {
          req.token = token;
          req.loggedUser = {
            id: data.id,
            email: data.email
          };
          
          next();
        };
      });
  } else {
    res.statusCode = 401;
    res.json({ "err": "Token inválido" });
  };
};

module.exports = auth;
