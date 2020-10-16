/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/secret.js');

module.exports = (req, res, next) => {
  // res.status(401).json({ you: 'shall not pass!' });
  const headers = req.headers;

  if (headers.authorization) {
    jwt.verify(headers.authorization, jwtSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: 'invalid credentials' });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    })
  } else {
    res.status(400).json({ message: 'did not get credentials' });
  }
};
