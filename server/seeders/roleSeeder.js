const mongoose = require('mongoose');
const mdb = require('../models');

const roles = [
    {
        _id: new mongoose.Types.ObjectId('6889ee1aadcfc6365cac56da'),
        name: 'user',
        description: 'user',
        createdAt: new Date('2025-07-30T10:04:10.134Z'),
        updatedAt: new Date('2025-07-30T11:22:12.808Z'),
    },
    {
        _id: new mongoose.Types.ObjectId('688a00aa72fc60d82668f304'),
        name: 'admin',
        description: 'admin',
        createdAt: new Date('2025-07-30T11:23:22.554Z'),
        updatedAt: new Date('2025-07-30T11:23:22.554Z'),
    },
];

const roleSeeder = async () => {
    for (const role of roles) {
        const exists = await mdb.Role.findOne({ name: role.name });

        if (exists) {
            console.log(`⚠️ Role "${role.name}" already exists. Skipping...`);
        } else {
            await mdb.Role.create(role);
            console.log(`✅ Role "${role.name}" inserted`);
        }
    }
};

module.exports = roleSeeder;
