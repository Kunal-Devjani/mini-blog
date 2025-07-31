const router = require('express').Router();

router.use('/', require('./postRoutes'));
router.use('/', require('./roleRoutes'));
router.use('/', require('./userRoutes'));

module.exports = router;
