const mdb = require('../models');
const { status, messages, common } = require('../utils');

// Create Role
exports.createRole = async (req, res) => {
    try {
        await mdb.Role.create({
            name: req.body.name,
            description: req.body.description,
        });
        return res.status(status.OK).json({ message: messages.role_create });
    } catch (err) {
        return common.throwException(err, 'Create Role', req, res);
    }
};

// Get All Roles
exports.getAllRoles = async (req, res) => {
    try {
        const roles = await mdb.Role.find({ deletedAt: null }, { _id: 1, name: 1 }).sort({ createdAt: -1 }).lean();

        return res.status(status.OK).json({ data: roles });
    } catch (err) {
        return common.throwException(err, 'Get All Roles', req, res);
    }
};

// Get Role By Id
exports.getRoleById = async (req, res) => {
    try {
        const role = await mdb.Role.findOne({
            _id: req.params.id,
            deletedAt: null,
        }).lean();

        if (!role) {
            return res.status(status.NotFound).json({ message: messages.role_not_found });
        }
        return res.status(status.OK).json({ data: role });
    } catch (err) {
        return common.throwException(err, 'Get Role By Id', req, res);
    }
};

// Update Role
exports.updateRole = async (req, res) => {
    try {
        const role = await mdb.Role.findOne({
            _id: req.params.id,
            deletedAt: null,
        });

        if (!role) {
            return res.status(status.NotFound).json({ message: messages.role_not_found });
        }

        role.name = req.body.name || role.name;
        role.description = req.body.description || role.description;

        await role.save();

        return res.status(status.OK).json({ message: messages.role_update });
    } catch (err) {
        return common.throwException(err, 'Update Role', req, res);
    }
};

// Soft Delete
exports.deleteRole = async (req, res) => {
    try {
        const role = await mdb.Role.findOne({
            _id: req.params.id,
            deletedAt: null,
        });

        if (!role) {
            return res.status(status.NotFound).json({ message: messages.role_not_found });
        }
        role.deletedAt = new Date();
        await role.save();

        return res.status(status.OK).json({ message: messages.role_delete });
    } catch (err) {
        return common.throwException(err, 'Delete Role', req, res);
    }
};
