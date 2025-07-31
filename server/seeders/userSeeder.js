const mongoose = require('mongoose');
const mdb = require('../models');

const users = [
    {
        username: 'admin123',
        email: 'superadmin@gmail.com',
        password: '$2b$10$2EUitnKeTU7miGyrWfGokudwTq/YPXW0EDJJPnKcflAGVBOmDTY1O', // Admin@123
        roleId: new mongoose.Types.ObjectId('688a00aa72fc60d82668f304'), // admin role
        status: true,
        deletedAt: null,
        createdAt: new Date('2025-07-30T12:47:29.599Z'),
        updatedAt: new Date('2025-07-30T12:47:29.599Z'),
    },
];

const userSeeder = async () => {
    for (const user of users) {
        const exists = await mdb.User.findOne({ email: user.email });

        if (exists) {
            console.log(`⚠️ User with email "${user.email}" already exists. Skipping...`);
        } else {
            await mdb.User.create(user);
            console.log(`✅ User "${user.username}" inserted`);
        }
    }
};

module.exports = userSeeder;
