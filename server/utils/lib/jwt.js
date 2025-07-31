const jwt = require('jsonwebtoken');

exports.generateToken = (payload, roleName) => {
  const secret =
    roleName === 'admin'
      ? process.env.JWT_SECRET_ADMIN
      : process.env.JWT_SECRET_CLIENT;

  return jwt.sign(payload, secret, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });
};

exports.verifyToken = (token, roleName) => {
  const secret =
    roleName === 'admin'
      ? process.env.JWT_SECRET_ADMIN
      : process.env.JWT_SECRET_CLIENT;

  return jwt.verify(token, secret);
};

exports.decodeToken = (token) => {
  return jwt.decode(token);
};
