require('dotenv').config();

const mongoose = require('mongoose');
const connectDB = require('../config/db');
const roleSeeder = require('./roleSeeder');
const userSeeder = require('./userSeeder');

const run = async () => {
    await connectDB();
    await roleSeeder();
    await userSeeder();
    await mongoose.disconnect();
};

run();
