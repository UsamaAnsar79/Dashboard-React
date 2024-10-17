const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');

router.get('/', roleController.getRoles);
router.post('/addRole', roleController.addRole);
router.put('/updateRole/:roleId', roleController.updateRole);
router.delete('/deleteRole/:id', roleController.deleteRole);
router.put('/toggleRole/:roleId', roleController.toggleRole);
router.get('/rolePermissions', roleController.getRolePermissions);

module.exports = router;
