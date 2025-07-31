const router = require('express').Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.post('/user/register', userController.createUser);
router.post('/user/login', userController.login);
router.get('/user', auth, userController.getAllUsers);
router.get('/user/:id', auth, userController.getUserById);
router.put('/user/:id', auth, userController.updateUser);
router.delete('/user/:id', auth, userController.deleteUser);

module.exports = router;
