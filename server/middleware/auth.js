const mongoose = require('mongoose');
const mdb = require('../models'); 
const jwtUtil = require('../utils/lib/jwt'); 
const { status, messages, enums } = require('../utils');

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization || null;

    if (!token) {
      return res.status(status.Unauthorized).json({ message: messages.unauthorized });
    }

    const tempDecoded = jwtUtil.decodeToken(token);
    if (!tempDecoded?.roleId) {
      return res.status(status.Unauthorized).json({ message: messages.unauthorized });
    }

    const role = await mdb.Role.findById(tempDecoded.roleId);
    if (!role) {
      return res.status(status.Unauthorized).json({ message: messages.unauthorized });
    }

    
    const decoded = jwtUtil.verifyToken(token, role.name);

    const user = await mdb.User.findOne({
      _id: decoded._id,
      deletedAt: null,
      status: enums.Status.Active,
    }).populate('roleId');

    if (!user) {
      return res.status(status.Unauthorized).json({ message: messages.unauthorized });
    }

    req.user = user;
    req.tokenData = decoded;
    next();
  } catch (err) {
    return res.status(status.Unauthorized).json({ message: messages.unauthorized });
  }
};

module.exports = authenticateUser;
