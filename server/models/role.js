const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            enum: ['user', 'admin'],
        },
        description: {
            type: String,
            default: '',
        },
        deletedAt: {
            type: Date,
            required: false,
        },
    },
    { timestamps: true }
);

const Role = mongoose.model('role', roleSchema);
module.exports = Role;
