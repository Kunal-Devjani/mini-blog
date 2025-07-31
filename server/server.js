const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const compression = require('compression');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();
connectDB();

const app = express();

app.use(compression());

app.use(
    cors({
        origin: '*',
    })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ** App Route Versions
const V1Routes = '/api/v1';
app.use(V1Routes, require('./routes'));

// Error Handler Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
