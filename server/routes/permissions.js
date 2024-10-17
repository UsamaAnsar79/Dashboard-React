// routes/permissions.js
const express = require('express');
const router = express.Router();
const {
  getPermissions,
  addPermission,
  updatePermission,
  deletePermission,
  togglePermission,
} = require('../controllers/permissionController');

// Fetch all permissions
router.get('/permissions', getPermissions);

// Add a new permission
router.post('/addPermission', addPermission);

// Update permission
router.put('/updatePermission', updatePermission);

// Delete permission
router.delete('/deletePermission', deletePermission);

// Toggle permission active/inactive
router.put('/togglePermission', togglePermission);

module.exports = router;
