const router = require('express').Router();
const roleController = require('../controllers/roleController');
const auth = require('../middleware/auth');

router.post('/role', auth, roleController.createRole);
router.get('/role', auth, roleController.getAllRoles);
router.get('/role/:id', auth, roleController.getRoleById);
router.put('/role/:id', auth, roleController.updateRole);
router.delete('/role/:id', auth, roleController.deleteRole);

module.exports = router;
