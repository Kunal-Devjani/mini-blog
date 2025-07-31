const mdb = require('../models');
const bcrypt = require('bcrypt');
const jwtUtil = require('../utils/lib/jwt');
const { status, messages, common, enums } = require('../utils');

// Create User
exports.createUser = async (req, res) => {
    try {
        await mdb.User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            roleId: enums.Role.user,
        });

        return res.status(status.OK).json({ message: messages.user_registration });
    } catch (err) {
        return common.throwException(err, 'Create User', req, res);
    }
};

// Get All Users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await mdb.User.find({ 
            deletedAt: null,
            roleId: { $ne: enums.Role.admin },
        }, 
        { 
            username: 1, 
            email: 1, 
            roleId: 1, 
            status: 1 
        })
            .sort({ createdAt: -1 })
            .lean();
        res.status(status.OK).json({ data: users });
    } catch (err) {
        return common.throwException(err, 'Get All Users', req, res);
    }
};

// Get User by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await mdb.User.findOne({
            _id: req.params.id,
            roleId: { $ne: enums.Role.admin },
            deletedAt: null
        }).lean();

        if (!user) {
            return res.status(status.NotFound).json({ message: messages.user_not_found });
        }

        return res.status(status.OK).json({ data: user });
    } catch (err) {
        return common.throwException(err, 'Get User By ID', req, res);
    }
};

// Update User
exports.updateUser = async (req, res) => {
    try {
        const user = await mdb.User.findOne({
            _id: req.params.id,
            deletedAt: null,
        });

        if (!user) {
            return res.status(status.NotFound).json({ message: messages.user_not_found });
        }

        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        user.roleId = req.body.roleId || user.roleId;

        await user.save();

        return res.status(status.OK).json({ message: messages.user_update });
    } catch (err) {
        return common.throwException(err, 'Update User', req, res);
    }
};

// Delete User
exports.deleteUser = async (req, res) => {
    try {
        const user = await mdb.User.findOne({
            _id: req.params.id,
            deletedAt: null,
        });

        if (!user) {
            return res.status(status.NotFound).json({ message: messages.user_not_found });
        }

        user.deletedAt = new Date();
        user.status = false
        await user.save();

        return res.status(status.OK).json({ message: messages.user_delete });
    } catch (err) {
        return common.throwException(err, 'Delete User', req, res);
    }
};

// Login User
exports.login = async (req, res) => {
  try {

    if (!req.body.email || !req.body.password){
      return res.status(status.BadRequest).json({ message: 'Email and password are required' });
    }

    const user = await mdb.User.findOne({ 
        email : req.body.email, 
        deletedAt: null 
    }).populate('roleId');

    if (!user){
      return res.status(status.Unauthorized).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch){
      return res.status(status.Unauthorized).json({ message: 'Invalid email or password' });
    }

    const token = jwtUtil.generateToken(
      {
        _id: user._id,
        email: user.email,
        roleId: user.roleId._id,
      },
      user.roleId.name
    );

    return res.status(status.OK).json({
      message: 'Login successful',
      token,
      user: {
        _id: user._id,
        email: user.email,
        username: user.username,
        roleId: user.roleId._id,
        role: user.roleId.name,
      },
    });
  } catch (err) {
     return common.throwException(err, 'Login User', req, res);
  }
};
